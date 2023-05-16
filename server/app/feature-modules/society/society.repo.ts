import { FilterQuery, UpdateQuery } from "mongoose";
import { societyModel } from "./society.schema";
import { ISociety } from "./society.types";


const create=(data:Partial<ISociety>)=>societyModel.create(data)
const find=(pipeline:any)=>societyModel.aggregate(pipeline)
const update=(filter:FilterQuery<ISociety>,data:UpdateQuery<ISociety>)=>societyModel.updateOne(filter,data)

export default{
    create,find,update
}