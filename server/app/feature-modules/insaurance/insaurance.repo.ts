import { FilterQuery, UpdateQuery } from "mongoose";
import { insauranceModel } from "./insaurance.schema";
import { IInsaurance } from "./insaurance.types";

const create=(data:Partial<IInsaurance>)=>insauranceModel.create(data)
const find=(pipeline:any)=>insauranceModel.aggregate(pipeline)
const update=(filter:FilterQuery<IInsaurance>,data:UpdateQuery<IInsaurance>)=>insauranceModel.updateOne(filter,data)

export default{
    create,find,update
}