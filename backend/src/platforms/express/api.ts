import AuthController from "./auth.controller";
import express, {Request, Response, NextFunction} from "express";
import {Mongoose} from "mongoose";
import cookieSession from "cookie-session";
import {ExpressController} from "./express.controller";
import {NotFoundError} from "../../errors";
import {ErrorHandler, LogError} from "../../middlewares";




function launchAPI(connection: Mongoose){
    if (!process.env.JWT_KEY){
        console.log("JWT_KEY must be defined inside .env file");
        return;
    }
    const app = express();
    app.use(express.json());

    // The middleware cookieSession creates the 'req.session' object
    app.use(cookieSession({
        signed: false
    }));

    // put all routes
    const controllers: ExpressController[] = [
        new AuthController(connection)
    ];
    for (let i= 0; i < controllers.length; ++i){
        app.use(controllers[i]._path, controllers[i].buildRoutes());
    }

    // route not found
    app.all('*',
        async (req: Request, res: Response, next: NextFunction) => {
            next(new NotFoundError());
        });

    app.use(LogError);

    // catch errors
    app.use(ErrorHandler);

    // running the server
    app.listen(process.env.PORT, () => {
        console.log(`Listening on port ${process.env.PORT}...`);
    });
}

export default launchAPI;

