import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import connectDB from "./Database/connectdb.js";


const app = express();
app.use(cors({credentials:true,origin:'http://localhost:5173'}));
app.use(express.json());

const PORT = process.env.PORT || 8003;

// MongoDB Connection
connectDB();


app.listen(PORT, () => {
    console.log(`server is listening on port:${PORT}`);
})