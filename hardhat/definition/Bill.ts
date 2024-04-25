
export enum Status {
    Fail = 0,
    Success = 1
}
export interface Bill {
    amount: bigint;
    status: bigint;
    timestamp: string;
    transactionHash: string;
    customer: string;
    seller: string;
}