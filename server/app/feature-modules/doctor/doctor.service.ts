import { FilterQuery, Types, UpdateQuery } from "mongoose";
import { genratePipeline } from "../../utils/filterPipeline";
import doctorRepo from "./doctor.repo";
import { DOCTOR_RESPONSE } from "./doctor.resposne";
import { IDoctor } from "./doctor.types";
import { doctorModel } from "./doctor.schema";

const create = async (data: Partial<IDoctor>) => {

    const result = await doctorRepo.create(data)
    if (!result) throw DOCTOR_RESPONSE.UPDATE_FAILED
    return result
}

const getAllDoctor = async (filter: any) => {
    const filterPipeline = genratePipeline(filter)
    return await doctorRepo.find(filterPipeline)
}
const findOne = async (filter: Partial<IDoctor>) => await doctorModel.findOne(filter)

const update = (filter: FilterQuery<IDoctor>, data: UpdateQuery<IDoctor>) => doctorRepo.update(filter, data)

const deleteUser = (filter: FilterQuery<IDoctor>) => update(filter, { $set: { isDeleted: true } })

const getHospitalDoctor = async (hospitalId: any) => {
    const hospitalDoctprPipeline :any= [
        {
            match: {
                hospitalId: new Types.ObjectId(hospitalId)
            }
        }
    ]
    return await doctorModel.aggregate(hospitalDoctprPipeline)
}
export default {
    create, getAllDoctor, update, deleteUser, findOne,getHospitalDoctor
}