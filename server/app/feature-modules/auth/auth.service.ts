
import { authResponses } from "./auth.responses";
import { Iauth } from "./auth.types";
import { generateToken } from "../../utils/token/token";
import userService from "../user/user.service";
import { hash, genSalt } from "bcryptjs";
import { FilterQuery } from "mongoose";
import { IUser } from "../user/user.types";
import { USER_RESPONSE } from '../user/user.resposne';
import hospitalService from "../hospital/hospital.service";
import societyService from "../society/society.service";
import doctorService from "../doctor/doctor.service";

const encryptPassword = async (data: string) => await hash(data, await genSalt(10))

const register = async (data: FilterQuery<IUser>) => {

    if (data.role == process.env.ROLE_HOSPITAL_ADMIN) {
        const userExists = await hospitalService.findOne({ email: data.email })
        if (userExists) throw USER_RESPONSE.ALREADY_EXISTS
        await encryptPassword(data.password)
        const hospital = await hospitalService.create(data)
        return hospital
    }
    if (data.role == process.env.ROLE_SOCIETY_ADMIN) {
        const userExists = await societyService.findOne({ email: data.email })
        if (userExists) throw USER_RESPONSE.ALREADY_EXISTS
        await encryptPassword(data.password)
        const society = await societyService.create(data)
        return society
    }
    if (data.role == process.env.ROLE_DOCTOR) {
        const userExists = await doctorService.findOne({ email: data.email })
        if (userExists) throw USER_RESPONSE.ALREADY_EXISTS
        await encryptPassword(data.password)
        const doctor = await doctorService.create(data)
        return doctor
    }
    if(data.role==process.env.ROLE_USER){
        const userExists = await userService.findOne({ email: data.email })
        if (userExists) throw USER_RESPONSE.ALREADY_EXISTS
        await encryptPassword(data.password)
        console.log(data)
        const user = await userService.create(data)
        return user
    }
}


const login = async (credential: Iauth) => {

    let user :any= await userService.findOne(credential);
    user=await hospitalService.findOne(credential)
    user=await societyService.findOne(credential)
    user=await doctorService.findOne(credential)

    if (!user) throw authResponses.INVALID_CREDENTIAL;
    const { _id, role } = user;
    const token = generateToken({ id: _id, role: role });
    return { token, role: role };
}

export default {
    login, register
}
