import AuthRouter from './auth/auth.routes';
import userRouter from "./user/user.route"
import HospiatalRouter from "./hospital/hospital.route"
import doctorRouter from "./doctor/doctor.route"
import prescriptionRouter from "./prescription/prescription.routes"
export default {
    userRouter,
    HospiatalRouter,
    AuthRouter,
    doctorRouter,
    prescriptionRouter
}