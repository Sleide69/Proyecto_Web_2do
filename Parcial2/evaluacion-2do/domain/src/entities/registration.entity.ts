import { BaseEntity } from './base.entity';
import { RegistrationStatus } from '../enums';

/**
 * Entidad Registration - Representa una inscripción de competidor en una carrera
 */
export class Registration extends BaseEntity {
  public raceId: string;
  public competitorId: string;
  public status: RegistrationStatus;
  public registrationDate: Date;
  public confirmationCode: string;
  public notes?: string;

  // Propiedades opcionales para relaciones
  public race?: any;
  public competitor?: any;

  constructor(data: Partial<Registration> = {}) {
    super(data.id);
    
    this.raceId = data.raceId || '';
    this.competitorId = data.competitorId || '';
    this.status = data.status || RegistrationStatus.PENDING;
    this.registrationDate = data.registrationDate || new Date();
    this.confirmationCode = data.confirmationCode || this.generateConfirmationCode();
    this.notes = data.notes;

    // Relaciones opcionales
    this.race = data.race;
    this.competitor = data.competitor;

    if (data.createdAt) {
      (this as any).createdAt = data.createdAt;
    }
    if (data.updatedAt) {
      this.updatedAt = data.updatedAt;
    }
  }

  /**
   * Genera un código de confirmación único
   */
  private generateConfirmationCode(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `REG-${timestamp.slice(-4)}-${random}`;
  }

  /**
   * Confirma la inscripción
   */
  public confirm(): void {
    this.status = RegistrationStatus.CONFIRMED;
    this.touch();
  }

  /**
   * Cancela la inscripción
   */
  public cancel(): void {
    this.status = RegistrationStatus.CANCELLED;
    this.touch();
  }

  /**
   * Marca la inscripción como completada
   */
  public complete(): void {
    this.status = RegistrationStatus.COMPLETED;
    this.touch();
  }

  /**
   * Verifica si la inscripción está activa
   */
  public isActive(): boolean {
    return this.status === RegistrationStatus.CONFIRMED || 
           this.status === RegistrationStatus.PENDING;
  }

  /**
   * Verifica si la inscripción puede ser cancelada
   */
  public canBeCancelled(): boolean {
    return this.status === RegistrationStatus.PENDING || 
           this.status === RegistrationStatus.CONFIRMED;
  }

  /**
   * Actualiza las notas de la inscripción
   */
  public updateNotes(notes: string): void {
    this.notes = notes;
    this.touch();
  }

  /**
   * Serialización completa incluyendo campos específicos
   */
  public toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      raceId: this.raceId,
      competitorId: this.competitorId,
      status: this.status,
      registrationDate: this.registrationDate,
      confirmationCode: this.confirmationCode,
      notes: this.notes,
      race: this.race,
      competitor: this.competitor,
    };
  }

  /**
   * Crea una instancia desde datos planos
   */
  public static fromJSON(data: any): Registration {
    return new Registration({
      ...data,
      registrationDate: new Date(data.registrationDate),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    });
  }
}
