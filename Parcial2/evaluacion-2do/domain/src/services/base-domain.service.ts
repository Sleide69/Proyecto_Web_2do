import { IEventPublisher, IDomainEvent, DomainEventType } from '../interfaces';

/**
 * Clase base para servicios de dominio
 * Proporciona funcionalidad común como validación y eventos
 */
export abstract class BaseDomainService {
  protected eventPublisher?: IEventPublisher;

  constructor(eventPublisher?: IEventPublisher) {
    this.eventPublisher = eventPublisher;
  }

  /**
   * Publica un evento de dominio
   */
  protected async publishEvent(
    eventType: DomainEventType,
    aggregateId: string,
    data: any,
    version: number = 1
  ): Promise<void> {
    if (!this.eventPublisher) {
      return;
    }

    const event: IDomainEvent = {
      eventType,
      aggregateId,
      data,
      timestamp: new Date(),
      version,
    };

    await this.eventPublisher.publish(event);
  }

  /**
   * Valida que un ID sea válido (UUID v4)
   */
  protected validateId(id: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }

  /**
   * Valida que una fecha sea válida y no esté en el pasado
   */
  protected validateFutureDate(date: Date, allowToday: boolean = false): boolean {
    const now = new Date();
    if (allowToday) {
      now.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);
      return date >= now;
    }
    return date > now;
  }

  /**
   * Valida que una fecha de inicio sea anterior a una fecha de fin
   */
  protected validateDateRange(startDate: Date, endDate: Date): boolean {
    return startDate < endDate;
  }

  /**
   * Maneja errores comunes y los transforma en mensajes útiles
   */
  protected handleError(error: any, context: string): Error {
    if (error instanceof Error) {
      return new Error(`${context}: ${error.message}`);
    }
    return new Error(`${context}: ${String(error)}`);
  }

  /**
   * Aplica filtros de paginación a un array
   */
  protected applyPagination<T>(
    items: T[], 
    page: number = 1, 
    limit: number = 10
  ): { items: T[]; total: number; page: number; totalPages: number } {
    const total = items.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    return {
      items: items.slice(startIndex, endIndex),
      total,
      page,
      totalPages,
    };
  }

  /**
   * Aplica filtros de ordenamiento a un array
   */
  protected applySorting<T>(
    items: T[], 
    sortBy: keyof T, 
    sortOrder: 'asc' | 'desc' = 'asc'
  ): T[] {
    return items.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue === bValue) return 0;
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }

  /**
   * Sanitiza texto de entrada eliminando caracteres peligrosos
   */
  protected sanitizeText(text: string): string {
    return text
      .trim()
      .replace(/[<>]/g, '') // Eliminar < y >
      .replace(/\s+/g, ' '); // Normalizar espacios
  }

  /**
   * Genera un código alfanumérico aleatorio
   */
  protected generateCode(length: number = 8, prefix: string = ''): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = prefix;
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
  }

  /**
   * Calcula la diferencia en días entre dos fechas
   */
  protected daysBetween(date1: Date, date2: Date): number {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  /**
   * Verifica si un email tiene formato válido
   */
  protected isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Verifica si un número de teléfono tiene formato válido
   */
  protected isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  }
}
