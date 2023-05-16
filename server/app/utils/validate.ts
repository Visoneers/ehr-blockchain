import { Request,Response,NextFunction } from "express";
import { validationResult } from "express-validator";
export const validate=(req:Request,res:Response,next:NextFunction)=>{
    const err=validationResult(req);
    if(!err.isEmpty()) return next({
        statusCode:400,
        errors: err.array()
    })
    next();
}


