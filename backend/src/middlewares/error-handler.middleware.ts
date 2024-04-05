import {Request, Response, NextFunction} from "express";
import {BasicError} from "../errors";

export const ErrorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof BasicError){
        return res.status(err.statusCode).send({errors: err.serializeErrors()});
    }

    return res.status(400).send({
        errors: [{message: "Something went wrong!"}]
    })
}
