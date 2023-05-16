export interface ISociety{
    _id?:string,
    name:string,
    adminId:string,
    address:IAddress,
    email:string,
    contact:number,
    password:string
}

export interface IAddress{
    area:string,
    city:string,
    state:string,
    pincode:number
}