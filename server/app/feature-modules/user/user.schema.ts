import { Types, model } from "mongoose";
import { BaseSchema } from "../../utils/baseschema";
import { IUser } from "./user.types";

const userSchema=new BaseSchema({

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
    societyId:{
        type:Types.ObjectId,
        ref:"societies",
    },
    
    hospitalId:{
        type:Types.ObjectId,
        ref:"hospitals"
    },
    insauranceId:{
        type:Types.ObjectId,
        ref:"insaurances"
    }
})

type userDocument=Document &IUser

export const userModel=model<userDocument>("user",userSchema)