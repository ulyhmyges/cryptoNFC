import {BasicError} from "./basic.error";

export class DatabaseConnectionError extends BasicError {
    public statusCode = 500;

    constructor() {
        super('database connection error');

        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors(): { message: string; field?: string }[] {
        return [{message: "Error connecting to database"}];
    }
}