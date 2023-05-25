import { ResponseHandler } from './../../utils/response.handler';
import { Role } from './../../utils/constant';
import { NextFunction, Router, Request, Response } from "express";
import { FILTER_PRODUCT_VALIDATOR } from "../../utils/filterPipeline";
import { validateRole } from "../../utils/checkrole";
import userService from './user.service';
import { USER_UPDATE_VALIDATOR } from './user.validator';

const router = Router()

router.get("/",
    FILTER_PRODUCT_VALIDATOR,
    validateRole([Role.ADMIN, Role.DOCTOR, Role.SOCIETY_ADMIN, Role.USER]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.query
            const result = await userService.getAllUser(query)
            res.send(new ResponseHandler(result))
        } catch (error) {
            next(error)
        }
    })

router.patch("/:id",
    validateRole([Role.ADMIN, Role.SOCIETY_ADMIN, Role.USER]),
    USER_UPDATE_VALIDATOR,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const _id = req.params.id
            const data = req.body
            const result = await userService.update({ _id: _id }, data)
            res.send(new ResponseHandler(result))
        } catch (error) {
            next(error)
        }
    })

router.delete("/:id",
    validateRole([Role.ADMIN, Role.SOCIETY_ADMIN, Role.USER]),
    USER_UPDATE_VALIDATOR,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const _id = req.params.id
            const result = await userService.update({ _id: _id }, { isDeleted: true })
            res.send(new ResponseHandler(result))
        } catch (error) {
            next(error)
        }
    })



//users of particular hospital
router.get("/hospitalUsers",
    //validateRole([Role.HOSPITAL_ADMIN]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.body.id
            console.log("helo")
            const result = await userService.getHospitalUser(id)
            res.send(new ResponseHandler(result))
        } catch (error) {
            next(error)
        }
    })

router.get("/allUsers",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await userService.getAllUser({})
            res.send(new ResponseHandler(result))
        } catch (error) {
            next(error)
        }
    })
router.get("getSocietyUsers",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const societyId = req.body.id
            const result = await userService.getSocietyUsers(societyId)
            res.send(new ResponseHandler(result))
        } catch (error) {
            next(error)
        }
    })

router.get("/userProfile",
async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const userId=req.body.userId
        const result= await userService.userProfile(userId)
        res.send(new ResponseHandler(result))
    } catch (error) {
        next(error)
    }
})
export default router