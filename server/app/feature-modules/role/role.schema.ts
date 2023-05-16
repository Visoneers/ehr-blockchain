import { model } from "mongoose";
import { BaseSchema } from "../../utils/baseschema";
import { IRole } from "./role.types";

const roleSchema=new BaseSchema({

    role:{
        type:String,
        required:true,
        unique:true
    }
})

type roleDocument=IRole & Document

export const roleModel=model<roleDocument>("roles",roleSchema)