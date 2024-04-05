import {BasicError} from "./basic.error";

export class BadRequestError extends BasicError {
    public statusCode = 400;
    public message: string;

    constructor(message: string) {
        super(message);
        this.message = message;

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{message: this.message}];
    }
}