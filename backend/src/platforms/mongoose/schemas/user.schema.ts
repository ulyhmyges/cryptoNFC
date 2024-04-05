import mongoose from "mongoose";
import {IUser} from "../../../definitions";


/**
 * Schema definition
 */
export const UserSchema = new mongoose.Schema<IUser>({
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
    },
    walletAddress: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    role: {
        type: mongoose.SchemaTypes.String,
        required: true,
        enum: ['marchant', 'client']
    }
}, {
    versionKey: false,
    collection: 'users',
    timestamps: true,
    toJSON: {
        transform(doc, ret){
            delete ret.password;
        }
    }
});

export const UserModel: mongoose.Model<IUser> = mongoose.model<IUser>('Account', UserSchema);

