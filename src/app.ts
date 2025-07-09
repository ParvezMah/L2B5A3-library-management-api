import express, {Application, Request, Response,} from "express";
import { bookRoutes } from "./app/controllers/book.controller";




const app: Application = express()


// Middlewares
app.use(express.json()) 

// Routes
app.use('/api/books', bookRoutes)
// app.use('api/borrow', borrowRoutes)


app.get('/', (req: Request, res: Response)=>{
    res.send("Welcome to a well defined library management API")
})

export default app;