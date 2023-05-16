import { Types, model } from "mongoose";
import { BaseSchema } from "../../utils/baseschema";
import { IDoctor, } from "./doctor.types";

const doctorSchema=new BaseSchema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Types.ObjectId,
        ref:"roles",
        required:true
    },
    hospitalId:{
        type:Types.ObjectId,
        ref:"hospitals"
    },
})

type doctorDocument=Document &IDoctor

export const doctorModel=model<doctorDocument>("doctor",doctorSchema)