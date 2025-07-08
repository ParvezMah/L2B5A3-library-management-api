import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book',
        required: [true, "Book reference is mandatory"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is mandatory"],
        min : [1, "It Contains at least 1"],
    },
    dueDate: {
        type: Date,
        required: [true, "Due Date reference is mandatory"],
    },
},{
    timestamps: true,
})

export const Borrow = model<IBorrow>('Borrow', borrowSchema)