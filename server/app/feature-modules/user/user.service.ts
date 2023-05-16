import { FilterQuery, UpdateQuery } from "mongoose";
import { genratePipeline } from "../../utils/filterPipeline";
import userRepo from "./user.repo";
import { USER_RESPONSE } from "./user.resposne";
import { IUser } from "./user.types";
import { userModel } from "./user.schema";

const create = async (data: Partial<IUser>) => {
    const result = await userRepo.create(data)
    if (!result) throw USER_RESPONSE.UPDATE_FAILED
    return result
}

const getAllUser = async (filter: any) => {
    const filterPipeline = genratePipeline(filter)
    return await userRepo.find(filterPipeline)
}
const findOne=async(filter:Partial<IUser>)=>await userModel.findOne(filter)

const update=(filter:FilterQuery<IUser>,data:UpdateQuery<IUser>)=>userRepo.update(filter,data)

const deleteUser=(filter:FilterQuery<IUser>)=>update(filter,{$set:{isDeleted:true}})

export default{
    create,getAllUser,update,deleteUser,findOne
}