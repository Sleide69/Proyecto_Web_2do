export declare enum PaymentMethod {
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT_CARD = "DEBIT_CARD",
    BANK_TRANSFER = "BANK_TRANSFER",
    PAYPAL = "PAYPAL",
    CASH = "CASH"
}
export declare enum PaymentStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED",
    REFUNDED = "REFUNDED"
}
export declare class Payment {
    id: string;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    transactionId?: string;
    paymentDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    constructor(data?: Partial<Payment>);
}
