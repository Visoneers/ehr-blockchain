import { FilterQuery, UpdateQuery } from "mongoose";
import { genratePipeline } from "../../utils/filterPipeline";
import societyRepo from "./society.repo";
import { SOCIETY_RESPONSE } from "./society.reponse";
import { societyModel } from "./society.schema";
import { ISociety } from "./society.types";


const create = async (data: Partial<ISociety>) => {
    const result = await societyRepo.create(data)
    if (!result) throw SOCIETY_RESPONSE.UPDATE_FAILED
    return result
}

const getAllSociety = async (filter: any) => {
    const filterPipeline = genratePipeline(filter)
    return await societyRepo.find(filterPipeline)
}
const findOne = async (filter: Partial<ISociety>) => await societyModel.findOne(filter)

const update = (filter: FilterQuery<ISociety>, data: UpdateQuery<ISociety>) => societyRepo.update(filter, data)

const deleteUser = (filter: FilterQuery<ISociety>) => update(filter, { $set: { isDeleted: true } })

export default {
    create, getAllSociety, update, deleteUser, findOne
}