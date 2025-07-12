import express, { Request, Response } from "express"
import { Book } from "../models/book.model";


export const bookRoutes = express.Router();


bookRoutes.post('/create-book',  async (req:Request, res:Response)=> {
    try {
        const body = req.body;
        const book = await Book.create(body)

        res.status(201).json({
            success: true,
            message: "Book has Created",
            book
        })
        
    } catch (error: any) {
        if(error.name === "ValidationError"){
            res.status(400).json({
                message: 'Validation Failed',
                success : false,
                error: error,
            });
        }

        res.status(400).json({
            success: false,
            message: 'Creating book has failed',
            error
        })
    }
})


bookRoutes.get('/', async (req:Request, res:Response)=> {
    try {
        const {filter, sortBy='createdAt', sort='desc', limit='10', page='1'} = req.query;
        // console.log("ReqQuery : ", req.query);

        const filterQuery = filter ? {genre: filter} : {};
        const pageNumber = parseInt(page as string) || 1;
        const limitNumber = parseInt(limit as string) || 10;
        const skipPage = (pageNumber-1)* limitNumber;

        const books = await Book.find(filterQuery)
        .sort({[sortBy as string]: sort==='desc'? -1 : 1})
        .skip(skipPage)
        .limit(limitNumber);
        // console.log('Filtered Book : ', books)
        // console.log("Book Received : ", book)

        res.status(200).json({
            success: true,
            message: "Books has Received",
            books
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: 'Book Retrieving has failed',
            error
        })
    }
})



bookRoutes.get('/:bookId', async (req:Request, res:Response)=> {
    try {
        const bookId = req.params.bookId
        const book = await Book.findOne({_id : bookId})

        res.status(201).json({
            success: true,
            message: "Books has Received",
            book
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: 'Your Book Not Found',
            error
        })
    }
})


bookRoutes.put('/:bookId', async (req:Request, res:Response)=> {
    try {
        const bookId = req.params.bookId;
        const updatedBody = req.body;
        const updatedbook = await Book.findByIdAndUpdate(bookId, updatedBody, {new: true})

        if(!updatedbook){
            res.status(404).json({
                success: false,
                message: "Book not found to update"
            })
        }

        res.status(200).json({
            success: true,
            message: "Book has Updated with data",
            data: updatedbook
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: 'Your Book Failed to Updated',
            error
        })
    }
})

bookRoutes.delete('/:bookId', async (req:Request, res:Response)=> {
    try {
        const bookId = req.params.bookId;
        const deletedBook = await Book.findByIdAndDelete(bookId)

        res.status(201).json({
            success: true,
            message: "Your Book has Deleted",
            deletedBook
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            success: false,
            message: 'Your Book Not Found to Delete',
            error
        })
    }
})
