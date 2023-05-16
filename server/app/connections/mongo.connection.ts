import { connect } from "mongoose"

export const connectToMongo=async()=>{
    try {
        const {MONGODB_URL}=process.env;
        await connect(MONGODB_URL||"");
        return true;
    } catch (error) {
        console.log('Could not connect to mongodb');
        throw {message:"Could not connect to mongodb",error}
    }
}