import express, { urlencoded } from 'express'
import { connectToMongo } from './connections/mongo.connection';
import { registerRoutes } from './routes/routes';

import cors from "cors"
import { corsOptions, credentials } from './utils/cors';
import cookieParser from 'cookie-parser';
export const startServer = async () => {
    try {
        const app = express();
        const { PORT } = process.env;
        await connectToMongo();

        app.use(credentials)
        app.use(cors(corsOptions))
        app.use(cookieParser())
        app.use(express.urlencoded({ extended: false }))
        registerRoutes(app)
        app.listen(
            PORT || 4000,
            () => console.log('Server started')
        )
    } catch (error) {
        console.log("Could not start the server");
        process.exit(1)
    }
}