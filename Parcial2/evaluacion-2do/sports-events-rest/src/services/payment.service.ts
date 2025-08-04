import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { JsonPersistenceService } from '../persistence/json-persistence.service';
import { Payment, PaymentStatus } from '../entities/payment.entity';
import { CreatePaymentDto, UpdatePaymentDto } from '../dto/payment.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PaymentService {
  constructor(private readonly persistence: JsonPersistenceService) {}

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const payment = new Payment({
      id: uuidv4(),
      ...createPaymentDto,
      status: PaymentStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    return this.persistence.create('payments', payment);
  }

  async findAllPayments(): Promise<Payment[]> {
    return this.persistence.findAll<Payment>('payments');
  }

  async findPaymentById(id: string): Promise<Payment> {
    const payment = this.persistence.findById<Payment>('payments', id);
    if (!payment) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }
    return payment;
  }

  async updatePayment(id: string, updatePaymentDto: UpdatePaymentDto): Promise<Payment> {
    await this.findPaymentById(id); // Verificar que existe

    const updatedPayment = this.persistence.update<Payment>('payments', id, updatePaymentDto);
    if (!updatedPayment) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }

    return updatedPayment;
  }

  async processPayment(id: string): Promise<Payment> {
    const payment = await this.findPaymentById(id);

    if (payment.status !== PaymentStatus.PENDING) {
      throw new BadRequestException(`El pago no puede ser procesado. Estado actual: ${payment.status}`);
    }

    // Simular procesamiento del pago
    const updates = {
      status: PaymentStatus.PROCESSING,
      paymentDate: new Date()
    };

    return this.updatePayment(id, updates);
  }

  async completePayment(id: string, transactionId?: string): Promise<Payment> {
    const payment = await this.findPaymentById(id);

    if (payment.status !== PaymentStatus.PROCESSING) {
      throw new BadRequestException(`El pago no puede ser completado. Estado actual: ${payment.status}`);
    }

    const updates = {
      status: PaymentStatus.COMPLETED,
      transactionId: transactionId || `TXN-${Date.now()}`,
      paymentDate: new Date()
    };

    return this.updatePayment(id, updates);
  }

  async cancelPayment(id: string): Promise<Payment> {
    const payment = await this.findPaymentById(id);

    if (payment.status === PaymentStatus.COMPLETED) {
      throw new BadRequestException('No se puede cancelar un pago completado');
    }

    return this.updatePayment(id, { status: PaymentStatus.CANCELLED });
  }

  async refundPayment(id: string): Promise<Payment> {
    const payment = await this.findPaymentById(id);

    if (payment.status !== PaymentStatus.COMPLETED) {
      throw new BadRequestException('Solo se pueden reembolsar pagos completados');
    }

    return this.updatePayment(id, { status: PaymentStatus.REFUNDED });
  }

  async getPaymentsByStatus(status: PaymentStatus): Promise<Payment[]> {
    return this.persistence.findBy<Payment>('payments', { status });
  }

  async getPaymentStatistics() {
    const allPayments = this.persistence.findAll<Payment>('payments');
    
    const stats = {
      total: allPayments.length,
      pending: 0,
      processing: 0,
      completed: 0,
      failed: 0,
      cancelled: 0,
      refunded: 0,
      totalAmount: 0,
      completedAmount: 0
    };

    allPayments.forEach(payment => {
      stats[payment.status.toLowerCase()]++;
      stats.totalAmount += payment.amount;
      
      if (payment.status === PaymentStatus.COMPLETED) {
        stats.completedAmount += payment.amount;
      }
    });

    return stats;
  }
}
