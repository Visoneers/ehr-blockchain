import { IAddress } from "../society/society.types";

export interface IHospital{
    _id?:string,
    name:string,
    email:string,
    password:string,
    role:string,
    societId:string,
    address:IAddress,
    contact:number
}