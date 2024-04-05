import {BasicError} from "./basic.error";

export class NotFoundError extends BasicError {
    public statusCode = 404;

    constructor() {
        super('Route not found');

        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{message: "Not Found"}];
    }
}
