import { JsonPersistenceService } from '../persistence/json-persistence.service';
import { Payment, PaymentStatus } from '../entities/payment.entity';
import { CreatePaymentDto, UpdatePaymentDto } from '../dto/payment.dto';
export declare class PaymentService {
    private readonly persistence;
    constructor(persistence: JsonPersistenceService);
    createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment>;
    findAllPayments(): Promise<Payment[]>;
    findPaymentById(id: string): Promise<Payment>;
    updatePayment(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment>;
    processPayment(id: string): Promise<Payment>;
    completePayment(id: string, transactionId?: string): Promise<Payment>;
    cancelPayment(id: string): Promise<Payment>;
    refundPayment(id: string): Promise<Payment>;
    getPaymentsByStatus(status: PaymentStatus): Promise<Payment[]>;
    getPaymentStatistics(): Promise<{
        total: number;
        pending: number;
        processing: number;
        completed: number;
        failed: number;
        cancelled: number;
        refunded: number;
        totalAmount: number;
        completedAmount: number;
    }>;
}
