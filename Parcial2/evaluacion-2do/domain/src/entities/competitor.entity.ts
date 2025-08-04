import { BaseEntity } from './base.entity';
import { ShirtType, ShirtSize } from '../enums';

/**
 * Entidad Competitor - Representa un competidor/participante
 */
export class Competitor extends BaseEntity {
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public shirtType: ShirtType;
  public shirtSize: ShirtSize;

  constructor(data: Partial<Competitor> = {}) {
    super(data.id);
    
    this.firstName = data.firstName || '';
    this.lastName = data.lastName || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.shirtType = data.shirtType || ShirtType.COTTON;
    this.shirtSize = data.shirtSize || ShirtSize.M;

    if (data.createdAt) {
      (this as any).createdAt = data.createdAt;
    }
    if (data.updatedAt) {
      this.updatedAt = data.updatedAt;
    }
  }

  /**
   * Obtiene el nombre completo del competidor
   */
  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }

  /**
   * Valida que los datos del competidor sean válidos
   */
  public validate(): string[] {
    const errors: string[] = [];

    if (!this.firstName.trim()) {
      errors.push('First name is required');
    }
    if (!this.lastName.trim()) {
      errors.push('Last name is required');
    }
    if (!this.email.trim()) {
      errors.push('Email is required');
    }
    if (!this.isValidEmail(this.email)) {
      errors.push('Email format is invalid');
    }
    if (!this.phone.trim()) {
      errors.push('Phone is required');
    }

    return errors;
  }

  /**
   * Valida formato de email
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Actualiza la información de la camiseta
   */
  public updateShirtInfo(type: ShirtType, size: ShirtSize): void {
    this.shirtType = type;
    this.shirtSize = size;
    this.touch();
  }

  /**
   * Serialización completa incluyendo campos específicos
   */
  public toJSON(): Record<string, any> {
    return {
      ...super.toJSON(),
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      shirtType: this.shirtType,
      shirtSize: this.shirtSize,
      fullName: this.fullName,
    };
  }

  /**
   * Crea una instancia desde datos planos
   */
  public static fromJSON(data: any): Competitor {
    return new Competitor({
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    });
  }
}
