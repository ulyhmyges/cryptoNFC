export abstract class BasicError extends Error {
    abstract statusCode: number;
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, BasicError.prototype);
    }
    abstract serializeErrors(): {message: string; field?: string}[];
}