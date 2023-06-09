import { Types, model } from "mongoose";
import { BaseSchema } from "../../utils/baseschema";
import { IHospital } from "./hospital.types";

const hospitalSchema = new BaseSchema({

    name: {
        type: String,
        required: true
    },
    id:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Types.ObjectId,
        ref: "roles",
        required: true
    },
    societyId: {
        type: Types.ObjectId,
        ref: "societies",
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    pincode: {
        type: Number
    },
    contact: {
        type: Number
    }
})

type hospitalDocument = Document & IHospital

export const hospitalModel = model<hospitalDocument>("hospital", hospitalSchema)