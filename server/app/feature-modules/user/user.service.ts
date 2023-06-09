import { FilterQuery, Types, UpdateQuery } from "mongoose";
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
    // return await userRepo.find(filterPipeline)
    return userModel.aggregate([

        {

            $lookup: {
                localField: "societyId",
                from: "societies",
                as: "society",
                foreignField: "_id"


            }
        }])
}
const findOne = async (filter: Partial<IUser>) => await userModel.findOne(filter)

const update = (filter: FilterQuery<IUser>, data: UpdateQuery<IUser>) => userRepo.update(filter, data)

const deleteUser = (filter: FilterQuery<IUser>) => update(filter, { $set: { isDeleted: true } })

const getHospitalUser = async (hospitalId: any) => {
    console.log(new Types.ObjectId(hospitalId))
    const hospitalUserPipeline = [{
        $lookup: {
            from: "societies",
            localField: "societyId",
            foreignField: "_id",
            as: "society"
        },
    },
    {
        $match: {
            "society.0.hospitalId": new Types.ObjectId(hospitalId)
        }
    }
    ]

    return await userModel.aggregate(hospitalUserPipeline)
}

const getSocietyUsers = async (societyId: any) => {
    const societyUserPipeline = [
        {
            $match: {
                "society.0.hospitalId": new Types.ObjectId(societyId)
            }
        }, {
            $lookup: {
                from: "societies",
                localField: "societyId",
                foreignField: "_id",
                as: "society"
            }
        }
    ]
    return await userModel.aggregate(societyUserPipeline)
}

const getAllUsers = async () => {
    return await userModel.find({})
}
const userProfile = async (userId: any) => {
    console.log(new Types.ObjectId(userId))
    return await userModel.aggregate([
        { $match: { "_id": new Types.ObjectId(userId) } },
        {
            $lookup: {
                from: "societies",
                localField: "societyId",
                foreignField: "_id",
                as: "society"
            }
        },
        { $unwind: "$society" },
        {
            $lookup: {
                from: "hospitals",
                localField: "society.hospitalId",
                foreignField: "_id",
                as: "hospital"
            }
        }

    ])
}
export default {
    create, getAllUser, update, deleteUser, findOne, getHospitalUser, getAllUsers,
    getSocietyUsers, userProfile
}