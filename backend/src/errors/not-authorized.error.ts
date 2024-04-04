import {BasicError} from "./basic.error";

export class NotAuthorizedError extends BasicError {
    public statusCode = 401;
    public message: string;
    constructor(message?: string){
        super(message || 'Not authorized request');
        this.message = message || 'Not Authorized';

        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }
    serializeErrors(): { message: string; field?: string }[] {
        return [{message: this.message }];
    }
}