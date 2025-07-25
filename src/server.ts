import { Server } from "http";
import app from "./app";
import { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();



const PORT = process.env.PORT || 5000;

let server: Server;


async function main(){
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        app.listen(PORT, ()=> {
            console.log(`Library management API is running on : ${PORT}`)
        })
    } catch (error) {
        console.error("Failed to connect to MongoDB : ", error);
    }
}

main()