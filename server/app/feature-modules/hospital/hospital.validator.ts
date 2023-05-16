import { body, param } from "express-validator";
import { validate } from "../../utils/validate";
export const HOSPITAL_UPDATE_VALIDATOR=[
    param("_id").isString().notEmpty().withMessage("id req"),
    body("name").optional().isString().notEmpty().withMessage("name req"),
    body("societyId").optional().isString().notEmpty().withMessage("society req"),
    body("insuaranceId").optional().isString().notEmpty().withMessage("insaurance id must be string"),
    body("hospitalId").optional().isString().notEmpty().withMessage("hospital req"),
    validate
]