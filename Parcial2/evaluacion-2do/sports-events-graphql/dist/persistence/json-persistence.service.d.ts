export interface DatabaseData {
    races: any[];
    competitors: any[];
    payments: any[];
    registrations: any[];
}
export declare class JsonPersistenceService {
    private readonly dbPath;
    private readDatabase;
    private writeDatabase;
    findAll<T>(collection: keyof DatabaseData): T[];
    findById<T>(collection: keyof DatabaseData, id: string): T | undefined;
    create<T>(collection: keyof DatabaseData, item: T & {
        id: string;
    }): T;
    update<T>(collection: keyof DatabaseData, id: string, updates: Partial<T>): T | null;
    delete(collection: keyof DatabaseData, id: string): boolean;
    findBy<T>(collection: keyof DatabaseData, criteria: Partial<T>): T[];
    findOneBy<T>(collection: keyof DatabaseData, criteria: Partial<T>): T | undefined;
    count(collection: keyof DatabaseData): number;
    countBy<T>(collection: keyof DatabaseData, criteria: Partial<T>): number;
}
