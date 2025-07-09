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


import userRoute from './user/routes/user.routes'
import tenentRoute from './user/routes/tenent.routes'
app.use('/api/user',userRoute)
app.use('/api/tenent',tenentRoute)

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on http://localhost:${process.env.SERVER_PORT}`);
});


  