import { model, Schema } from "mongoose";
import { IBook } from "../interfaces/book.interface";

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


export const Book = model<IBook>('Book', bookSchema);