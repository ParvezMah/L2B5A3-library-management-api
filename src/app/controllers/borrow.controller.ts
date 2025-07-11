import express, { Request, Response } from 'express'
import { Book } from '../models/book.model';
import { Borrow } from '../models/borrow.model';
import { error } from 'console';


export const borrowRoutes = express.Router()

borrowRoutes.post('/', async (req:Request, res:Response)=>{
    try {
        const {book, quantity, dueDate} = req.body;

        if(!book || !quantity || !dueDate){
            return res.status(400).json({
                success:false,
                message: 'Validation failed',
                error : {
                    type : 'MissingFields',
                    details : 'Book, Quantity and DueDate are required'
                }
            });
        }

        // const foundBook = await Book.findById(book);
        // if(!foundBook){
        //     return res.status(404).json({
        //         success: false,
        //         message: 'Borrow Failed',
        //         error: {
        //             type: 'Not Found',
        //             details: 'Book Not Found with given ID'
        //         }
        //     })
        // }
        // if(foundBook.copies < quantity){
        //     return res.status(400).json({
        //         success: false,
        //         message: 'Validation failed',
        //         error : {
        //             type: 'BorrowError',
        //             details: 'Not enough copies available to borrow'
        //         }
        //     });
        // }


        // foundBook.copies -= quantity;
        // await foundBook.save();

        const updatedAfterborrowedBook = await Book.findOneAndUpdate(
            {_id: book, copies: {$gte : quantity}}, {$inc: {copies: -quantity}},{new:true}
        );

        if(!updatedAfterborrowedBook){
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                error: {
                    type: 'BorrowError',
                    details: 'Book Not Found'
                }
            })
        }


        await Book.updateAvailability(book);

        const borrowRecord = await Borrow.create({book, quantity, dueDate});

        

        return res.status(201).json({
            success: true,
            message: 'Borrowing book Successfully',
            data: borrowRecord,
            updatedAfterborrowedBook
        })
        
    } catch (error: any) {
        if(error.name  === "ValidationError"){
            return res.status(400).json({
                message: 'Validation Failed',
                success : false,
                error: error,
            });
        }
        return res.status(400).json({
            success: false,
            message: 'Borrowing book failed',
            error
        })
    }
});

borrowRoutes.get('/', async (req:Request, res:Response)=>{
    try {
        const bookSummary = await Borrow.aggregate([
            {
                $group : {
                    _id: '$book',
                    totalQuantity: {$sum: '$quantity'}
                }      
            },
            {
                $lookup : {
                    from: 'books',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'bookInfo'
                }
            },
            {
                $unwind : '$bookInfo'
            },
            {
                $project : {
                    _id: 0,
                    book: {
                        title : '$bookInfo.title',
                        isbn: '$bookInfo.isbn'
                    },
                    totalQuantity: 1
                }
            }
        ]);

        return res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrived successfully',
            bookSummary
        })
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: 'Failed to retrive borrow summary',
            error
        })
    }
})