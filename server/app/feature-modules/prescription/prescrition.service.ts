import { FilterQuery, Types, UpdateQuery } from "mongoose";
import { genratePipeline } from "../../utils/filterPipeline";
import { IPrescription } from "./prescription.types";
import { PrescriptionModel } from "./prescription.schema";


const create = async (data: Partial<IPrescription>) => {
    const result = await PrescriptionModel.create(data)
    if (!result) throw ("user not created")
    return result
}

const findOne = async (prescriptionId: any) => await PrescriptionModel.aggregate([
    {
        $match: { _id: new Types.ObjectId(prescriptionId) }

    }, {
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user"
        }
    }, {
        $lookup: {
            from: "doctors",
            localField: "doctorId",
            foreignField: "_id",
            as: "doctor"
        }
    },
    { $unwind: "$doctor" }
    , {
        $lookup: {
            from: "hospitals",
            localField: "doctor.hospitalId",
            foreignField: "_id",
            as: "hospital"
        }
    }
])

const update = (filter: FilterQuery<IPrescription>, data: UpdateQuery<IPrescription>) => PrescriptionModel.update(filter, data)

const deletePrescription = (filter: FilterQuery<IPrescription>) => update(filter, { $set: { isDeleted: true } })

const getUserPrescritions = async (UserId: any) => {
    console.log(UserId)
    const prescription = await PrescriptionModel.aggregate([
        {
            $match: {
                userId: new Types.ObjectId(UserId)
            }
        }, {
            $lookup: {
                from: "doctors",
                localField:"doctorId",
                foreignField:"_id",
                as:"doctor"
            }
        }])
    return prescription
}
export default {
    create, update, deletePrescription, findOne, getUserPrescritions
}