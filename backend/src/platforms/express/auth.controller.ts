import * as express from "express";
import {Response, Request, NextFunction} from "express";

import mongoose, {Mongoose} from "mongoose";

import {ExpressController} from "./express.controller";
import PasswordUtil from "../../utils/password.util";

import {BadRequestError, NotAuthorizedError} from "../../errors";
import {Me} from "../../middlewares";
import jwt from "jsonwebtoken";
import {IUser, IUserPayload} from "../../definitions";
import {UserSchema} from "../mongoose";


declare global {
    namespace Express {
        interface Request {
            me?: IUserPayload;
        }
    }
}

class AuthController implements ExpressController {
    readonly _path = '/auth';
    readonly _userModel: mongoose.Model<IUser>


    constructor(connection: Mongoose) {
        this._userModel = connection.model<IUser>('Account', UserSchema);
    }

    async signup(req: Request, res: Response, next: NextFunction) {
        const {email, username, password, walletAddress, role} = req.body;
        try {
            const user = await this._userModel.create({
                username,
                email,
                password: await PasswordUtil.toHash(password),
                walletAddress: walletAddress,
                role: role
            });
            const userJwt = jwt.sign(
                {_id: user._id, username: user.username},
                process.env.JWT_KEY!
            );
            req.session = {
                jwt: userJwt
            };
            return res.status(201).send(user);
        } catch (err: unknown) {
            return next(new BadRequestError('Bad credentials'));
        }
    }

    async signin(req: Request, res: Response, next: NextFunction) {
        const {username, password} = req.body;
        try {
            const user = await this._userModel.findOne({username}).exec();
            const isSame = await PasswordUtil.compare(user?.password as string, password);
            if (isSame) {
                console.log("signin: ", {_id: user?._id, login: user?.username});
                const userJwt = jwt.sign(
                    {_id: user?._id, username: user?.username},
                    process.env.JWT_KEY!
                );
                req.session = {
                    jwt: userJwt
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
            res.send('Welcome home!');
        })
        router.post('/signup', this.signup.bind(this));
        router.post('/signin', this.signin.bind(this));
        router.get('/me', Me, this.me.bind(this));
        router.post('/signout', this.signout.bind(this));
        return router;
    }
}

export default AuthController;