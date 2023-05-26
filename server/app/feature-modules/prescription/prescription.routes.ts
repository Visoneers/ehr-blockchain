import { Role } from './../../utils/constant';
import { roleModel } from './../role/role.schema';

import { Router } from "express";
import prescritionService from "./prescrition.service";
import { Result } from "express-validator";
import { ResponseHandler } from '../../utils/response.handler';

const router = Router()
router.get("/topDieases/:id/:role",
    async (req, res, next) => {
        try {
            console.log("hello")
            const role=req.params.role
            const user=req.params.id
            const result=await prescritionService.getTopDieases(role,user)
            res.send(new ResponseHandler(result))
        } catch (error) {
            next(error)
        }
    })
router.post("/:userId",
    async (req, res, next) => {
        try {

            const userId = req.params.userId
            const prescriptionData = req.body
            console.log("new prescription route", userId, prescriptionData)
            const result = await prescritionService.create({ ...prescriptionData, userId })
            res.send(result)
        } catch (error) {
            next(error)
        }
    })
router.get("/:userId",
    async (req, res, next) => {
        try {
            const { userId } = req.params
            const result = await prescritionService.getUserPrescritions(userId)
            res.send(result)
        } catch (error) {
            next(error)
        }
    })
router.get("/:userId/:prescriptionId",
    async (req, res, next) => {
        try {
            const { userId, prescriptionId } = req.params
            const result = await prescritionService.findOne(prescriptionId)
            console.log(result)
            res.send(result)
        } catch (error) {
            next(error)
        }
    })

export default router