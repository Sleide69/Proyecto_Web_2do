import { BaseEntity } from './base.entity';
import { PaymentMethod, PaymentStatus } from '../enums';
/**
 * Entidad Payment - Representa un pago de inscripción
 */
export declare class Payment extends BaseEntity {
    registrationId: string;
    amount: number;
    method: PaymentMethod;
    status: PaymentStatus;
    transactionId: string;
    description?: string;
    paymentDate?: Date;
    registration?: any;
    constructor(data?: Partial<Payment>);
    /**
     * Genera un ID de transacción único
     */
    private generateTransactionId;
    /**
     * Inicia el procesamiento del pago
     */
    startProcessing(): void;
    /**
     * Confirma el pago como completado
     */
    complete(): void;
    /**
     * Marca el pago como fallido
     */
    fail(): void;
    /**
     * Cancela el pago
     */
    cancel(): void;
    /**
     * Procesa un reembolso
     */
    refund(): void;
    /**
     * Verifica si el pago está completado
     */
    isCompleted(): boolean;
    /**
     * Verifica si el pago puede ser reembolsado
     */
    canBeRefunded(): boolean;
    /**
     * Verifica si el pago está pendiente
     */
    isPending(): boolean;
    /**
     * Actualiza la descripción del pago
     */
    updateDescription(description: string): void;
    /**
     * Calcula la comisión del pago basada en el método
     */
    calculateFee(): number;
    /**
     * Obtiene el monto neto después de comisiones
     */
    getNetAmount(): number;
    /**
     * Serialización completa incluyendo campos específicos
     */
    toJSON(): Record<string, any>;
    /**
     * Crea una instancia desde datos planos
     */
    static fromJSON(data: any): Payment;
}
//# sourceMappingURL=payment.entity.d.ts.map