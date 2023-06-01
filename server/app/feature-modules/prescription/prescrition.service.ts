import { FilterQuery, Types, UpdateQuery } from "mongoose";
import { genratePipeline } from "../../utils/filterPipeline";
import { IPrescription } from "./prescription.types";
import { PrescriptionModel } from "./prescription.schema";


const create = async (data: Partial<IPrescription>) => {
    const result = await PrescriptionModel.create(data)
    if (!result) throw ("prescription not created")
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
                localField: "doctorId",
                foreignField: "_id",
                as: "doctor"
            }
        }])
    return prescription
}


const getTopDieases = (role: any, userId: any) => {
    console.log(role,userId)
    let userPipeline: any = [
        {
            $lookup: {
                from: "users",
                as: "user",
                foreignField: "_id",
                localField: "userId"
            }
        }
    ]
    if (role == process.env.ROLE_SOCIETY_ADMIN || role == process.env.ROLE_USER) {
        console.log("society to dieases", userId)
        userPipeline.push(
            {
                $match: {
                    "user.societyId": new Types.ObjectId(userId)
                }
            }
        )
    }
    if (role == process.env.ROLE_HOSPITAL_ADMIN) {
        console.log("hospiatl top dieases")
        const hospitalUser = [
            {
                $unwind: "$user"
            }, {
                $lookup: {
                    from: "societies",
                    foreignField: "_id",
                    localField: "user.societyId",
                    as: "society"
                }
            },
            { $unwind: "$society" },
            {
                $match: { "society.hospitalId": new Types.ObjectId(userId) }
            }
        ]
        userPipeline = [...userPipeline, ...hospitalUser]
    }
 
    const topDieasesPipeline = [
        {
          $group: {
            _id: "$diseases",
            count: { $sum: 1 }
          }
        },
        {
          $sort: {
            count: -1
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$count" },
            diseases: { $push: { _id: "$_id", count: "$count" } }
          }
        },
        {
          $project: {
            _id: 0,
            total: 1,
            diseases: 1
          }
        },
        
      ];
    return PrescriptionModel.aggregate([...userPipeline, ...topDieasesPipeline])
}
export default {
    create, update, deletePrescription, findOne, getUserPrescritions, getTopDieases
}