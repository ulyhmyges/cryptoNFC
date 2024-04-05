import mongoose from "mongoose";
import {IAccount} from "../../../definitions";


/**
 * Schema definition
 */
export const AccountSchema = new mongoose.Schema<IAccount>({
    username: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    }
}, {
    versionKey: false,
    collection: 'accounts',
    timestamps: true,
    toJSON: {
        transform(doc, ret){
            delete ret.password;
        }
    }
});

export const AccountModel: mongoose.Model<IAccount> = mongoose.model<IAccount>('Account', AccountSchema);

