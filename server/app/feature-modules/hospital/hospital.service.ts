import { FilterQuery, UpdateQuery } from "mongoose";
import { genratePipeline } from "../../utils/filterPipeline";
import hospitalRepo from "./hospital.repo";
import { HOSPITAL_RESPONSE } from "./hospital.resposne";
import {  IHospital } from "./hospital.types";
import { hospitalModel } from "./hospital.schema";

const create = async (data: Partial<IHospital>) => {
    const result = await hospitalRepo.create(data)
    if (!result) throw HOSPITAL_RESPONSE.UPDATE_FAILED
    return result
}

const getAllHospital = async (filter: any) => {
    const filterPipeline = genratePipeline(filter)
    return await hospitalRepo.find(filterPipeline)
}
const findOne=async(filter:Partial<IHospital>)=>await hospitalModel.findOne(filter)
const update=(filter:FilterQuery<IHospital>,data:UpdateQuery<IHospital>)=>hospitalRepo.update(filter,data)

const deleteUser=(filter:FilterQuery<IHospital>)=>update(filter,{$set:{isDeleted:true}})

export default{
    create,getAllHospital,update,deleteUser,findOne
}