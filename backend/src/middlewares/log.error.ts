import {Request, Response, NextFunction} from "express";

export const LogError = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('\nDate: ', new Date().toLocaleString(), '\nLOG: ', err.message);
    next(err);
}
