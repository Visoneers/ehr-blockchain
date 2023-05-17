import { FilterQuery, UpdateQuery } from "mongoose"
import { PrescriptionModel } from "./prescription.schema"
import { IPrescription } from "./prescription.types"


const create=(data:Partial<IPrescription>)=>PrescriptionModel.create(data)
const find=(pipeline:any)=>PrescriptionModel.aggregate(pipeline)
const update=(filter:FilterQuery<IPrescription>,data:UpdateQuery<IPrescription>)=>PrescriptionModel.updateOne(filter,data)

export default{
    create,find,update
}