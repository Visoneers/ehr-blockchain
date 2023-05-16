import { FilterQuery, UpdateQuery } from "mongoose";
import { genratePipeline } from "../../utils/filterPipeline";
import insauranceRepo from "./insaurance.repo";
import { INSAURANCE_RESPONSE } from "./insaurance.resposne";
import {  IInsaurance } from "./insaurance.types";
import { insauranceModel} from "./insaurance.schema";

const create = async (data: Partial<IInsaurance>) => {
    const result = await insauranceRepo.create(data)
    if (!result) throw INSAURANCE_RESPONSE.UPDATE_FAILED
    return result
}

const getAllInsaurace = async (filter: any) => {
    const filterPipeline = genratePipeline(filter)
    return await insauranceRepo.find(filterPipeline)
}
const findOne=async(filter:Partial<IInsaurance>)=>{
    const result=await insauranceModel.findOne(filter)
    if(!result) throw INSAURANCE_RESPONSE.NOT_FOUND
    return result
}
const update=(filter:FilterQuery<IInsaurance>,data:UpdateQuery<IInsaurance>)=>insauranceRepo.update(filter,data)

const deleteUser=(filter:FilterQuery<IInsaurance>)=>update(filter,{$set:{isDeleted:true}})

export default{
    create,getAllInsaurace,update,deleteUser,findOne
}