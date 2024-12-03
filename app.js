import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import blogRouter from "./routes/blogRouter.js";
import queryRouter from "./routes/queryRouter.js";
import adminRouter from "./routes/adminRouter.js";
import logoRouter from './routes/logoRouter.js'
import applicationRouter from "./routes/applicationRouter.js";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

import multer from "multer";
import path from "path";
const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(cors());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.use("/query", queryRouter);
app.use("/admin", adminRouter);
app.use("/application", applicationRouter);
app.use("/logo", logoRouter);

dbConnection();

app.use(errorMiddleware);

export default app;
