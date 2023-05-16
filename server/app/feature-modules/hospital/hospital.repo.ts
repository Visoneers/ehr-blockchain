import { FilterQuery, UpdateQuery } from "mongoose";
import { hospitalModel } from "./hospital.schema";
import { IHospital } from "./hospital.types";

const create=(data:Partial<IHospital>)=>hospitalModel.create(data)
const find=(pipeline:any)=>hospitalModel.aggregate(pipeline)
const update=(filter:FilterQuery<IHospital>,data:UpdateQuery<IHospital>)=>hospitalModel.updateOne(filter,data)

export default{
    create,find,update
}