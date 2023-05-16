import { NextFunction, Request, Response } from "express";
export const validateRole=(role:string[])=>async(req: Request, res: Response, next: NextFunction)=>{
    try {
        if(!role.includes(res.locals.user.role)) throw {statusCode:403,message:"Access Denied"};
        next()
    } catch (error) {
        next(error)
    }
}

