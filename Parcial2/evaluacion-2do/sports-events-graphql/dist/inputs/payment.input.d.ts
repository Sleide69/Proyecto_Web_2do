import { PaymentMethod, PaymentStatus } from '../entities/payment.entity';
export declare class CreatePaymentInput {
    amount: number;
    method: PaymentMethod;
    transactionId?: string;
}
export declare class UpdatePaymentInput {
    amount?: number;
    method?: PaymentMethod;
    status?: PaymentStatus;
    transactionId?: string;
}
