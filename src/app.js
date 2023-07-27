import express from "express";
import cors from 'cors';
import router from "./routes/index.js";
import mongoose from "mongoose";
const app = express();

app.use(express.json())
app.use(cors())

app.use('/api',router)

mongoose.connect("mongodb://127.0.0.1:27017/web208")
export const viteNodeApp = app;