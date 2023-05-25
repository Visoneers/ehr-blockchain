import { Types, model } from "mongoose";
import { BaseSchema } from "../../utils/baseschema";
import { IUser } from "./user.types";

const userSchema = new BaseSchema({
    id: {
        type: String
    },
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
    mobileNo: {
        type: Number
    },
    hospitalId: {
        type: Types.ObjectId,
        ref: "hospitals"
    },
    insauranceName: {
        type: String,
    },

    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    pinCode: {
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