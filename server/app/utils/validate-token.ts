import { NextFunction, Request, Response } from "express";
import { verifyToken } from "./token/token";

export const authorize = (excludedPaths: ExcludedPaths) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            if(excludedPaths.find(e => e.path === req.url && e.method === req.method)) return next();
            
            const token = req.headers.authorization;
            if (!token) return next({ message: 'UNAUTHORIZED', statusCode: 401 });

            const data=verifyToken(token);
            if(data) res.locals.user=data;
            next();
        } catch (e) {
            next({ message: 'UNAUTHORIZED', statusCode: 401 });
        }

    }
}

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class ExcludedPath {
    constructor(
        public path: string,
        public method: Method,
    ) {}
}

export type ExcludedPaths = ExcludedPath[];