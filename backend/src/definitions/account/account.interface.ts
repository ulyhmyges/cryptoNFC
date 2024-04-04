
export interface IAccount {
    _id?: string,
    login: string;
    password: string;
    email: string;
}

export interface IAccountPayload {
    _id: string;
    login: string;
}