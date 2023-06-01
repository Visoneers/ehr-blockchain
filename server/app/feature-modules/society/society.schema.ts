import { Types, model } from "mongoose";
import { BaseSchema } from "../../utils/baseschema";
import { ISociety } from "./society.types";

const societySchema = new BaseSchema({
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
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
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
    pinCode: {
        type: Number
    }
    ,
    hospitalId: {
        type: Types.ObjectId,
        ref: "hospitals"
    }
})

type societyDocument = Document & ISociety

export const societyModel = model<societyDocument>("society", societySchema)