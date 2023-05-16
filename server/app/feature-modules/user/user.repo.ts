import { FilterQuery, UpdateQuery } from "mongoose";
import { userModel } from "./user.schema";
import { IUser } from "./user.types";

const create=(data:Partial<IUser>)=>userModel.create(data)
const find=(pipeline:any)=>userModel.aggregate(pipeline)
const update=(filter:FilterQuery<IUser>,data:UpdateQuery<IUser>)=>userModel.updateOne(filter,data)

export default{
    create,find,update
}