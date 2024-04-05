import * as express from "express";
export abstract class ExpressController {
    abstract _path: string;

    abstract buildRoutes(): express.Router;

}