import { Types, model } from "mongoose";
import { BaseSchema } from "../../utils/baseschema";
import { IUser } from "./user.types";

const userSchema = new BaseSchema({

    name: {
        type: String,
        required: true
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

    hospitalId: {
        type: Types.ObjectId,
        ref: "hospitals"
    },
    insauranceId: {
        type: Types.ObjectId,
        ref: "insaurances"
    },

    area: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pincode: {
        type: Number
    },
    
    gender: String,
    vacinated: Boolean,
    age: Number,
    dob: Date,
    diseases: Array,
    medicines: Array,
    allergies: Array


})

type userDocument = Document & IUser

export const userModel = model<userDocument>("user", userSchema)