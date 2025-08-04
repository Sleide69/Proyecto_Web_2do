import { PaymentService } from '../services/payment.service';
import { CreatePaymentDto, UpdatePaymentDto } from '../dto/payment.dto';
import { PaymentStatus } from '../entities/payment.entity';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    create(createPaymentDto: CreatePaymentDto): Promise<import("../entities/payment.entity").Payment>;
    findAll(): Promise<import("../entities/payment.entity").Payment[]>;
    getStatistics(): Promise<{
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
    findByStatus(status: PaymentStatus): Promise<import("../entities/payment.entity").Payment[]>;
    findOne(id: string): Promise<import("../entities/payment.entity").Payment>;
    update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<import("../entities/payment.entity").Payment>;
    process(id: string): Promise<import("../entities/payment.entity").Payment>;
    complete(id: string, transactionId?: string): Promise<import("../entities/payment.entity").Payment>;
    cancel(id: string): Promise<import("../entities/payment.entity").Payment>;
    refund(id: string): Promise<import("../entities/payment.entity").Payment>;
}
