import { BaseEntity } from './base.entity';
import { RaceType, RaceStatus } from '../enums';

/**
 * Entidad Race - Representa una carrera deportiva
 */
export class Race extends BaseEntity {
  public name: string;
  public description: string;
  public type: RaceType;
  public eventDate: Date;
  public registrationStartDate: Date;
  public registrationEndDate: Date;
  public location: string;
  public distance: string;
  public maxParticipants: number;
  public registrationFee: number;
  public status: RaceStatus;

  constructor(data: Partial<Race> = {}) {
    super(data.id);
    
    this.name = data.name || '';
    this.description = data.description || '';
    this.type = data.type || RaceType.FIVE_K;
    this.eventDate = data.eventDate || new Date();
    this.registrationStartDate = data.registrationStartDate || new Date();
    this.registrationEndDate = data.registrationEndDate || new Date();
    this.location = data.location || '';
    this.distance = data.distance || '';
    this.maxParticipants = data.maxParticipants || 100;
    this.registrationFee = data.registrationFee || 0;
    this.status = data.status || RaceStatus.PLANNED;

    if (data.createdAt) {
      (this as any).createdAt = data.createdAt;
    }
    if (data.updatedAt) {
      this.updatedAt = data.updatedAt;
    }
  }

  /**
   * Verifica si la carrera está disponible para registro
   */
  public isAvailableForRegistration(): boolean {
    const now = new Date();
    return (
      this.status === RaceStatus.OPEN_REGISTRATION &&
      now >= this.registrationStartDate &&
      now <= this.registrationEndDate
    );
  }

  /**
   * Verifica si la carrera está completa (máximo de participantes alcanzado)
   */
  public isFull(currentParticipants: number): boolean {
    return currentParticipants >= this.maxParticipants;
  }

  /**
   * Actualiza el estado de la carrera
   */
  public updateStatus(newStatus: RaceStatus): void {
    this.status = newStatus;
    this.touch();
  }

  /**
   * Serialización completa incluyendo campos específicos
   */
  public toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      name: this.name,
      description: this.description,
      type: this.type,
      eventDate: this.eventDate,
      registrationStartDate: this.registrationStartDate,
      registrationEndDate: this.registrationEndDate,
      location: this.location,
      distance: this.distance,
      maxParticipants: this.maxParticipants,
      registrationFee: this.registrationFee,
      status: this.status,
    };
  }

  /**
   * Crea una instancia desde datos planos
   */
  public static fromJSON(data: any): Race {
    return new Race({
      ...data,
      eventDate: new Date(data.eventDate),
      registrationStartDate: new Date(data.registrationStartDate),
      registrationEndDate: new Date(data.registrationEndDate),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    });
  }
}
