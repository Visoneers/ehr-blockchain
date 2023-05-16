import { query } from "express-validator"
import { Types } from "mongoose"
import { validate } from "./validate"
 
interface IObjectKeys {
    [key: string]: number | string;
}
 
export const genratePipeline = (query: any) => {
    const { sort, sortDirection, page, limit, ...filter } = query
    const pipeline = []
    for (const feild in filter) {
 
        if (Array.isArray(filter[feild])) {
 
            const matchStage = {
                $match: {
                    [feild]: { $in: filter[feild] }
                }
            }
            pipeline.push(matchStage)
        }
        else if (typeof filter[feild] == "object") {
            const stage: IObjectKeys = {}
            for (const [operator, operand] of Object.entries(filter[feild])) {
                stage[`$${operator}`] = Number(operand)
            }
            pipeline.push({ $match: { [feild]: stage } })
        }
        else {
            if (Number.isInteger(filter[feild]))
                filter[feild] = Number(filter[feild])
            pipeline.push({
                $match: {
                    [feild]: filter[feild]
                }
            })
        }
    }
 
    const sortObj: IObjectKeys = {}
    if (sort) {
        sortObj[sort] = sortDirection === ("asc" || 1) ? 1 : -1
        pipeline.push({ $sort: sortObj })
    }
 
    pipeline.push(
        {
            $facet: {
                totalCount: [{ $count: "totalResults" }],
                paginetResult: [
                    { $skip: (((Number(page) - 1) || 0) * (Number(limit) || 10)) },
                    { $limit: Number(limit) || 10 },
                ]
 
            }
        })
    return pipeline
}
 
export const FILTER_PRODUCT_VALIDATOR = [
    query("price.gt").optional().isInt().withMessage("price gt must be number"),
    query("price.gte").optional().isInt().withMessage("price gte must be number"),
    query("price.lt").optional().isInt().withMessage("price lt must be number"),
    query("price.lte").optional().isInt().withMessage("price lte must be number"),
 
    query("threshold.gt").optional().isInt().withMessage("threshold gt must be number"),
    query("threshold.gte").optional().isInt().withMessage("threshold gte must be number"),
    query("threshold.lt").optional().isInt().withMessage("threshold lt must be number"),
    query("threshold.lte").optional().isInt().withMessage("threshold lte must be number"),
 
    query("points.gt").optional().isInt().withMessage("points gt must be number"),
    query("points.gte").optional().isInt().withMessage("points gte must be number"),
    query("points.lt").optional().isInt().withMessage("points lt must be number"),
    query("points.lte").optional().isInt().withMessage("points lte must be number"),
 
    query("name").optional().isString().withMessage("product name should be string"),
 
    query("ownerId").optional().isString().withMessage("product ownerId should be string"),
    query("reward").optional().isString().withMessage("product reward should be string"),
 
    query("quantity.gt").optional().isInt().withMessage("quantity gt must be number"),
    query("quantity.gte").optional().isInt().withMessage("quantity gte must be number"),
    query("quantity.lt").optional().isInt().withMessage("quantity lt must be number"),
    query("quantity.lte").optional().isInt().withMessage("quantity lte must be number"),
 
    query("status").optional().isString().withMessage("product status should be string"),
    
    query("limit").optional().isInt().withMessage("limit shoul be number"),
    query("page").optional().isInt().withMessage("page shoul be number"),
    query("sortDirection").optional().isAlphanumeric().withMessage("sortDirection shoul be number"),
    query("sort").optional().isAlphanumeric().withMessage("product sort should be string"),
 
    validate
]
 
