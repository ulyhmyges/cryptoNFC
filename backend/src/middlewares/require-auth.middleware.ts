import {Request, Response, NextFunction} from "express";
import {NotAuthorizedError} from "../errors";

export const RequireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.me) {
        return next(new NotAuthorizedError());
    }
    next();
}
