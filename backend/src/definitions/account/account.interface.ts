
export interface IAccount {
    _id?: string,
    username: string;
    password: string;
    email: string;

}

export interface IAccountPayload {
    _id: string;
    username: string;
}