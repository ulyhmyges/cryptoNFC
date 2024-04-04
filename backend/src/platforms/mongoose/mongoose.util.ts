import {Mongoose, connect} from 'mongoose';

export class MongooseUtil {
    public static openConnection(): Promise<Mongoose> {
        return connect(process.env.MONGO_URI as string, {
            auth: {
                username: process.env.MONGO_USER,
                password: process.env.MONGO_PASSWORD
            },
            authSource: 'admin', // Collection des comptes utilisateurs
            autoCreate: true    // Mongoose va créer les tables et les bases pour nous
        })
    }
}