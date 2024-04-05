export interface IBill {
    _id?: string,
    sender: string;
    recipient: string;
    quantity: number;
    date: Date;
    transactionAddress: string;
}