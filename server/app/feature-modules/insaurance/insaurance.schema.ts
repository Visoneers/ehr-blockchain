import { Types, model } from "mongoose";
import { BaseSchema } from "../../utils/baseschema";
import { IInsaurance } from "./insaurance.types";

const insauranceSchema=new BaseSchema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number
    }
})

type insauranceDocument=Document &IInsaurance

export const insauranceModel=model<insauranceDocument>("user",insauranceSchema)