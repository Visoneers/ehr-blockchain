import { Application, json, Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../utils/response.handler";
import { authorize } from "../utils/validate-token";
import { allRoutes, excludedPaths } from "./routes.data";

export const registerRoutes = (app: Application) => {
    app.use(json());
    app.use(authorize(excludedPaths));
    for (let route of allRoutes) {
        app.use(route.path, (req: Request, res: Response, next: NextFunction) => {
            next()
        }, route.router);
    }

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err.statusCode || 500).send(new ResponseHandler(null, err));
    })
}