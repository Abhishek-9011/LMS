import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb";
import userRoute from "./routes/user.route";
import cors from 'cors'
import cookieParser from "cookie-parser";
dotenv.config({});
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
const PORT = process.env.PORT || 3000;
connectDb();
app.use("/api/v1", userRoute);
app.listen(PORT);
