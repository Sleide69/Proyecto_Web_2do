import { BaseEntity } from './base.entity';
import { PaymentMethod, PaymentStatus } from '../enums';

/**
 * Entidad Payment - Representa un pago de inscripción
 */
export class Payment extends BaseEntity {
  public registrationId: string;
  public amount: number;
  public method: PaymentMethod;
  public status: PaymentStatus;
  public transactionId: string;
  public description?: string;
  public paymentDate?: Date;

  // Propiedad opcional para relación
  public registration?: any;

  constructor(data: Partial<Payment> = {}) {
    super(data.id);
    
    this.registrationId = data.registrationId || '';
    this.amount = data.amount || 0;
    this.method = data.method || PaymentMethod.CREDIT_CARD;
    this.status = data.status || PaymentStatus.PENDING;
    this.transactionId = data.transactionId || this.generateTransactionId();
    this.description = data.description;
    this.paymentDate = data.paymentDate;

    // Relación opcional
    this.registration = data.registration;

    if (data.createdAt) {
      (this as any).createdAt = data.createdAt;
    }
    if (data.updatedAt) {
      this.updatedAt = data.updatedAt;
    }
  }

  /**
   * Genera un ID de transacción único
   */
  private generateTransactionId(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const methodPrefix = this.method.slice(0, 2);
    return `TXN-${methodPrefix}-${timestamp.slice(-6)}-${random}`;
  }

  /**
   * Inicia el procesamiento del pago
   */
  public startProcessing(): void {
    this.status = PaymentStatus.PROCESSING;
    this.touch();
  }

  /**
   * Confirma el pago como completado
   */
  public complete(): void {
    this.status = PaymentStatus.COMPLETED;
    this.paymentDate = new Date();
    this.touch();
  }

  /**
   * Marca el pago como fallido
   */
  public fail(): void {
    this.status = PaymentStatus.FAILED;
    this.touch();
  }

  /**
   * Cancela el pago
   */
  public cancel(): void {
    this.status = PaymentStatus.CANCELLED;
    this.touch();
  }

  /**
   * Procesa un reembolso
   */
  public refund(): void {
    if (this.status !== PaymentStatus.COMPLETED) {
      throw new Error('Only completed payments can be refunded');
    }
    this.status = PaymentStatus.REFUNDED;
    this.touch();
  }

  /**
   * Verifica si el pago está completado
   */
  public isCompleted(): boolean {
    return this.status === PaymentStatus.COMPLETED;
  }

  /**
   * Verifica si el pago puede ser reembolsado
   */
  public canBeRefunded(): boolean {
    return this.status === PaymentStatus.COMPLETED;
  }

  /**
   * Verifica si el pago está pendiente
   */
  public isPending(): boolean {
    return this.status === PaymentStatus.PENDING || 
           this.status === PaymentStatus.PROCESSING;
  }

  /**
   * Actualiza la descripción del pago
   */
  public updateDescription(description: string): void {
    this.description = description;
    this.touch();
  }

  /**
   * Calcula la comisión del pago basada en el método
   */
  public calculateFee(): number {
    const feeRates = {
      [PaymentMethod.CREDIT_CARD]: 0.029, // 2.9%
      [PaymentMethod.DEBIT_CARD]: 0.019,  // 1.9%
      [PaymentMethod.PAYPAL]: 0.034,      // 3.4%
      [PaymentMethod.BANK_TRANSFER]: 0.01, // 1.0%
      [PaymentMethod.CASH]: 0,            // 0%
    };

    return this.amount * (feeRates[this.method] || 0);
  }

  /**
   * Obtiene el monto neto después de comisiones
   */
  public getNetAmount(): number {
    return this.amount - this.calculateFee();
  }

  /**
   * Serialización completa incluyendo campos específicos
   */
  public toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      registrationId: this.registrationId,
      amount: this.amount,
      method: this.method,
      status: this.status,
      transactionId: this.transactionId,
      description: this.description,
      paymentDate: this.paymentDate,
      registration: this.registration,
      fee: this.calculateFee(),
      netAmount: this.getNetAmount(),
    };
  }

  /**
   * Crea una instancia desde datos planos
   */
  public static fromJSON(data: any): Payment {
    return new Payment({
      ...data,
      paymentDate: data.paymentDate ? new Date(data.paymentDate) : undefined,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    });
  }
}
