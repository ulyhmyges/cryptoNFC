
export interface IUser {
    _id?: string,
    username: string;
    password: string;
    email: string;
    walletAddress: string;
    role: string;
}

export interface IUserPayload {
    _id: string;
    username: string;
}