import express from 'express'
import cros from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import userRoute from './routes/user.router'

dotenv.config({
    path: './.env'
})
const corsOpts = {
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
const app = express()
app.use(cros(corsOpts))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

app.use('/api/v1/admin-user',userRoute)


const startServer = async () => {
    try {
        app.listen(process.env.PORT, () => {
            console.log(`Server running on http://localhost:${process.env.PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
    }
}

startServer()