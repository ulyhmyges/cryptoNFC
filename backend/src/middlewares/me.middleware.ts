import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {IUserPayload} from "../definitions";


export const Me = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.session || !req.session.jwt) {
        console.log("if");
        return next();
    }
    try {
        req.me = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as IUserPayload;

    } catch (e: unknown){

    }
    next();
}
