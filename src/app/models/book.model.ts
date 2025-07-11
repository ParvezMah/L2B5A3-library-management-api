import mongoose, { Model, model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";
import { Borrow } from "./borrow.model";

const bookSchema = new Schema<IBook>(
    {
        title: {
            type: String,
            required: [true, 'Title are mandatory'],
            trim: true
        },
        author: {
            type: String,
            required: [true, 'Author are mandatory'],
            trim: true
        },
        genre: {
            type: String,
            required: [true, 'Genre are mandatory'],
            enum: ["FICTION","NON_FICTION","SCIENCE","HISTORY","BIOGRAPHY","FANTASY"]
        },
        isbn: {
            type: String,
            required: [true, 'Isbn are mandatory'],
            trim: true,
            unique: true
        },
        description: {
            type: String,
            trim: true,
        },
        copies: {
            type: Number,
            required: [true, 'Copies are mandatory'],
            min: [0, 'Copies can not 0 or non negative number'],

        },
        available: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
    }
)


bookSchema.pre('save', function(next){
    console.log(`Book ${this.title} is about to be saved.`);
    next();
});


bookSchema.post('findOneAndUpdate', function(doc){
    console.log(`Book ${doc.title} has been updated.`)
});


bookSchema.statics.updateAvailability = async function (bookId: string) {
    const borrowedSummery = await Borrow.aggregate([
        {
            $match : {
                book : new mongoose.Types.ObjectId(bookId)
            }
        },
        {
            $group : {
                _id : '$book', 
                totalBorrowed : {
                    $sum : '$quantity'
                }
            }
        }
    ]);

    const totalBorrowed = borrowedSummery.length > 0 ? borrowedSummery[0].totalBorrowed : 0;

    const book = await this.findById(bookId)

    if(!book) return;

    const availableCopies = book.copies - totalBorrowed

    book.available = availableCopies > 0;

    await book.save()

    return book
}


export interface IBookModel extends Model<IBook>{
    updateAvailability(bookId:string):Promise<void>;
}


export const Book = model<IBook, IBookModel>('Book', bookSchema);