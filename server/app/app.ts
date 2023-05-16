import express from 'express'
import { connectToMongo } from './connections/mongo.connection';
import { registerRoutes } from './routes/routes';
export const startServer=async()=>{
    try {
        const app=express();
        const{PORT}=process.env;
        await connectToMongo();
        registerRoutes(app)
        app.listen(
            PORT || 4000,
            ()=>console.log('Server started')
        )
    } catch (error) {
        console.log("Could not start the server");
        process.exit(1)
    }
}