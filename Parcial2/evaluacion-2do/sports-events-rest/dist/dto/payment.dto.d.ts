import { PaymentMethod, PaymentStatus } from '../entities/payment.entity';
export declare class CreatePaymentDto {
    amount: number;
    method: PaymentMethod;
    transactionId?: string;
}
export declare class UpdatePaymentDto {
    amount?: number;
    method?: PaymentMethod;
    status?: PaymentStatus;
    transactionId?: string;
}
