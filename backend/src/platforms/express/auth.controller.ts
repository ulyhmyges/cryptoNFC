import * as express from "express";
import {Response, Request, NextFunction} from "express";

import mongoose, {Mongoose} from "mongoose";
import {AccountSchema} from "../mongoose/schemas";

import {IAccount, IAccountPayload} from "../../definitions/account";
import {ExpressController} from "./express.controller";
import PasswordUtil from "../../utils/password.util";

import {BadRequestError, NotAuthorizedError} from "../../errors";
import {Me} from "../../middlewares";
import jwt from "jsonwebtoken";


declare global {
    namespace Express {
        interface Request {
            me?: IAccountPayload;
        }
    }
}

class AuthController implements ExpressController {
    readonly _path = '/auth';
    readonly _accountModel: mongoose.Model<IAccount>


    constructor(connection: Mongoose) {
        this._accountModel = connection.model<IAccount>('Account', AccountSchema);
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        const {email, login, password} = req.body;
        try {
            const account = await this._accountModel.create({
                login,
                email,
                password: await PasswordUtil.toHash(password)
            });
            const accountJwt = jwt.sign(
                {_id: account._id, login: account.login},
                process.env.JWT_KEY!
            );
            req.session = {
                jwt: accountJwt
            };
            return res.status(201).send(account);
        } catch (err: unknown) {
            return next(new BadRequestError('Bad credentials'));
        }
    }

    async signin(req: Request, res: Response, next: NextFunction) {
        const {login, password} = req.body;
        try {
            const account = await this._accountModel.findOne({login}).exec();
            const isSame = await PasswordUtil.compare(account?.password as string, password);
            if (isSame) {
                console.log("signin: ", {_id: account?._id, login: account?.login});
                const accountJwt = jwt.sign(
                    {_id: account?._id, login: account?.login},
                    process.env.JWT_KEY!
                );
                req.session = {
                    jwt: accountJwt
                }
                return res.status(200).send({});
            }
            return next(new NotAuthorizedError('Wrong password'));
        } catch (e: unknown) {
            return next(new BadRequestError('Wrong login in signin route'));
        }
    }

    /**
     * does the user have a req.session.jwt set?
     */
    async me(req: Request, res: Response)
    {
        console.log("req.me", req.me);
        return res.send({me: req.me || null});
    }

    async signout(req: Request, res: Response) {
        req.session = null;
        res.send({});
    }

    buildRoutes(): express.Router {
        const router = express.Router();
        router.get('/', (req: Request, res: Response) => {
            res.send('hello world!');
        })
        router.post('/signup', this.signup.bind(this));
        router.post('/signin', this.signin.bind(this));
        router.get('/me', Me, this.me.bind(this));
        router.post('/signout', this.signout.bind(this));
        return router;
    }
}

export default AuthController;