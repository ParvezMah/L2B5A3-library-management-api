import express, {Application, Request, Response,} from "express";
import { bookRoutes } from "./app/controllers/book.controller";
import { borrowRoutes } from "./app/controllers/borrow.controller";
import cors from "cors";




const app: Application = express()

// Allow frontend to access API
app.use(cors({
    origin: ["http://localhost:5173", "https://frontend-nine-rose-41.vercel.app"],
}));


// Middlewares
app.use(express.json()) 

// Routes
app.use('/api/books', bookRoutes)
app.use('/api/borrow', borrowRoutes)


app.get('/', (req: Request, res: Response)=>{
    res.send("Welcome to a well defined library management API")
})

export default app;