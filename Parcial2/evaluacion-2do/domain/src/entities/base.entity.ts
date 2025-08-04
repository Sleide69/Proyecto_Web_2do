import { v4 as uuidv4 } from 'uuid';

/**
 * Clase base para todas las entidades del dominio
 * Proporciona funcionalidad común como ID, timestamps y serialización
 */
export abstract class BaseEntity {
  public readonly id: string;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(id?: string) {
    this.id = id || uuidv4();
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Actualiza el timestamp de modificación
   */
  public touch(): void {
    this.updatedAt = new Date();
  }

  /**
   * Convierte la entidad a un objeto plano para serialización
   */
  public toJSON(): Record<string, any> {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  /**
   * Compara dos entidades por su ID
   */
  public equals(other: BaseEntity): boolean {
    return this.id === other.id;
  }
}
