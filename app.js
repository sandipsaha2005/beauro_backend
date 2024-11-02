import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';
import userRouter from './routes/userRouter.js';
import blogRouter from './routes/blogRouter.js'
import queryRouter from './routes/queryRouter.js'
import adminRouter from './routes/adminRouter.js'
import { dbConnection } from './database/dbConnection.js';
import { errorMiddleware } from './middlewares/error.js';

import multer from 'multer';
import path from 'path'
const app = express();
dotenv.config({ path: './config/config.env' });

app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = ['http://localhost:3031', `${process.env.FRONTEND_URL}`, 'http://localhost:4173','http://localhost:3040','http://localhost:3032'];

        // Allow any origin that matches a dev tunnel URL pattern or is in the allowed list
        if (!origin || allowedOrigins.includes(origin) || origin.includes('.devtunnels.ms')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }, 
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true, // Allow credentials
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/query',queryRouter);
app.use('/admin',adminRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
