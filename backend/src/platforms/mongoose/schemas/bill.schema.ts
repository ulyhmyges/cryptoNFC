import mongoose from "mongoose";
import {IBill} from "../../../definitions";


/**
 * Schema definition
 */
export const BillSchema = new mongoose.Schema<IBill>({
    sender: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    recipient: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    quantity: {
        type: mongoose.SchemaTypes.Number,
        required: true
    },
    transactionAddress: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    }
}, {
    versionKey: false,
    collection: 'bills',
    timestamps: true
});

export const BillModel: mongoose.Model<IBill> = mongoose.model<IBill>('Bill', BillSchema);

