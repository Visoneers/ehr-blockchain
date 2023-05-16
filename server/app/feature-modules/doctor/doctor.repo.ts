import { FilterQuery, UpdateQuery } from "mongoose";
import { doctorModel } from "./doctor.schema";
import { IDoctor } from "./doctor.types";

const create=(data:Partial<IDoctor>)=>doctorModel.create(data)
const find=(pipeline:any)=>doctorModel.aggregate(pipeline)
const update=(filter:FilterQuery<IDoctor>,data:UpdateQuery<IDoctor>)=>doctorModel.updateOne(filter,data)

export default{
    create,find,update
}