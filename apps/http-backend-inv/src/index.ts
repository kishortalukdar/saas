import express from 'express'
import cros from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';


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

app.listen(5001,()=>{
    console.log("server is running ");
})


  