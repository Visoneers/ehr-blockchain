import { NextFunction, Request, Response } from "express";


export const corsOptions = {
    origin: (origin:any, callback:any) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}


export const allowedOrigins = [
    'https://www.yoursite.com',
    'http://127.0.0.1:5500',
    'http://localhost:3500',
    'http://localhost:3001'
];


export const credentials = (req:Request, res:Response, next:NextFunction) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin||"")) {
        //@ts-ignore
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}
