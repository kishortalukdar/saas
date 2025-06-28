import express from 'express'
import cros from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { mainDbConnection } from '@monorepo/sequelize'
import { loadModel } from './model/loadModel.js';

import userRoute from './routes/user.routes.js'
import productRoute from './routes/testing/product.routes.js'
import OrderRoute from './routes/testing/order.routes.js'

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

app.use('/api/v1/user', userRoute)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/order', OrderRoute)


const startServer = async () => {
    try {
        const sequelize = await mainDbConnection()
        await sequelize.authenticate();
        console.log("db connected")
        await loadModel(sequelize);
        app.listen(process.env.PORT, () => {
            console.log(`Server running on http://localhost:${process.env.PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
    }
}

startServer()