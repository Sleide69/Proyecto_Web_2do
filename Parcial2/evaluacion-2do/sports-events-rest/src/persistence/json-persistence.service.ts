import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

export interface DatabaseData {
  races: any[];
  competitors: any[];
  payments: any[];
  registrations: any[];
}

@Injectable()
export class JsonPersistenceService {
  private readonly dbPath = path.join(process.cwd(), 'data', 'database.json');

  private readDatabase(): DatabaseData {
    try {
      const data = fs.readFileSync(this.dbPath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // Si el archivo no existe, devolver estructura vacía
      const emptyData: DatabaseData = {
        races: [],
        competitors: [],
        payments: [],
        registrations: []
      };
      this.writeDatabase(emptyData);
      return emptyData;
    }
  }

  private writeDatabase(data: DatabaseData): void {
    fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
  }

  // Métodos genéricos para CRUD
  findAll<T>(collection: keyof DatabaseData): T[] {
    const data = this.readDatabase();
    return data[collection] as T[];
  }

  findById<T>(collection: keyof DatabaseData, id: string): T | undefined {
    const data = this.readDatabase();
    return data[collection].find(item => item.id === id) as T;
  }

  create<T>(collection: keyof DatabaseData, item: T & { id: string }): T {
    const data = this.readDatabase();
    data[collection].push(item);
    this.writeDatabase(data);
    return item;
  }

  update<T>(collection: keyof DatabaseData, id: string, updates: Partial<T>): T | null {
    const data = this.readDatabase();
    const index = data[collection].findIndex(item => item.id === id);
    
    if (index === -1) {
      return null;
    }

    data[collection][index] = { ...data[collection][index], ...updates, updatedAt: new Date() };
    this.writeDatabase(data);
    return data[collection][index] as T;
  }

  delete(collection: keyof DatabaseData, id: string): boolean {
    const data = this.readDatabase();
    const index = data[collection].findIndex(item => item.id === id);
    
    if (index === -1) {
      return false;
    }

    data[collection].splice(index, 1);
    this.writeDatabase(data);
    return true;
  }

  // Métodos de búsqueda específicos
  findBy<T>(collection: keyof DatabaseData, criteria: Partial<T>): T[] {
    const data = this.readDatabase();
    return data[collection].filter(item => {
      return Object.keys(criteria).every(key => item[key] === criteria[key]);
    }) as T[];
  }

  findOneBy<T>(collection: keyof DatabaseData, criteria: Partial<T>): T | undefined {
    const results = this.findBy<T>(collection, criteria);
    return results.length > 0 ? results[0] : undefined;
  }

  // Contar elementos
  count(collection: keyof DatabaseData): number {
    const data = this.readDatabase();
    return data[collection].length;
  }

  countBy<T>(collection: keyof DatabaseData, criteria: Partial<T>): number {
    return this.findBy<T>(collection, criteria).length;
  }
}
