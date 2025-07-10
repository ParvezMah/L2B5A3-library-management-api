import { Server } from "http";
import app from "./app";
import { Request, Response } from "express";
import mongoose from "mongoose";


const PORT = 3000;
let server: Server;


async function main(){
    try {
        await mongoose.connect('mongodb+srv://librarymanagementapi:librarymanagementapi@librarymanagementapi.lf7sw63.mongodb.net/?retryWrites=true&w=majority&appName=librarymanagementapi');
        console.log("Connected to MongoDB")
        app.listen(PORT, ()=> {
            console.log(`Library management API is running on : ${PORT}`)
        })
    } catch (error) {
        console.error("Failed to connect to MongoDB : ", error);
    }
}

main()