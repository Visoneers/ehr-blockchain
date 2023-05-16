import { body, param } from "express-validator";
import { validate } from "../../utils/validate";

export const INSAURANCE_UPDATE_VALIDATOR=[
    param("_id").isString().notEmpty().withMessage("id req"),
    body("name").optional().isString().notEmpty().withMessage("name req"),
    body("price").optional().isString().notEmpty().withMessage("price req"),
   
    validate
]