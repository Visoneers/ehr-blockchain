import { model } from "mongoose";
import { BaseSchema } from "../../utils/baseschema";
import { ISociety } from "./society.types";

const societySchema=new BaseSchema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
    },
    address:{
        area:{
            type:String
        },
        city:{
            type:String
        },
        state:{
            type:String
        },
        pincode:{
            type:Number
        }
    }
})

type societyDocument=Document&ISociety

export const societyModel =model<societyDocument>("society",societySchema)