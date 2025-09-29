import express from "express";
import cors from "cors";
// import cookieParser from "cookie-parser";
import requestRouter from './routes/request.routes.js';
import userRouter from './routes/users.routes.js';

const app=express();

app.use(cors({
    origin: 'http://localhost:5173'
}));


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(cookieParser());

app.use('/api/requests', requestRouter);
app.use('/api/users', userRouter);


export {app};