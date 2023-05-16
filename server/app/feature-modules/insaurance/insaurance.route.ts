import { Role } from '../../utils/constant';
import { NextFunction, Router, Request, Response } from "express";
import { FILTER_PRODUCT_VALIDATOR } from "../../utils/filterPipeline";
import { validateRole } from "../../utils/checkrole";
import insauranceService from './insaurance.service';
import { ResponseHandler } from '../../utils/response.handler';
import { INSAURANCE_UPDATE_VALIDATOR } from './insaurance.validator';

const router = Router()

router.get("/",
    FILTER_PRODUCT_VALIDATOR,
    validateRole([Role.ADMIN, Role.DOCTOR, Role.SOCIETY_ADMIN, Role.USER]),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const query = req.query
            const result = await insauranceService.getAllInsaurace(query)
            res.send(new ResponseHandler(result))
        } catch (error) {
            next(error)
        }
    })

router.patch("/:id",
    validateRole([Role.ADMIN, Role.SOCIETY_ADMIN, Role.USER]),
    INSAURANCE_UPDATE_VALIDATOR,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const _id = req.params.id
            const data = req.body
            const result = await insauranceService.update({ _id: _id }, data)
            res.send(new ResponseHandler(result))
        } catch (error) {
            next(error)
        }
    })

router.delete("/:id",
    validateRole([Role.ADMIN, Role.SOCIETY_ADMIN, Role.USER]),
    INSAURANCE_UPDATE_VALIDATOR,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const _id = req.params.id
            const result = await insauranceService.update({ _id: _id }, { isDeleted: true })
            res.send(new ResponseHandler(result))
        } catch (error) {
            next(error)
        }
    })
