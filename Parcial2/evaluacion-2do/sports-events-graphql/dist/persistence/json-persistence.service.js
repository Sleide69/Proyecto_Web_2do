"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonPersistenceService = void 0;
const fs = require("fs");
const path = require("path");
const common_1 = require("@nestjs/common");
let JsonPersistenceService = class JsonPersistenceService {
    constructor() {
        this.dbPath = path.join(process.cwd(), 'data', 'database.json');
    }
    readDatabase() {
        try {
            const data = fs.readFileSync(this.dbPath, 'utf8');
            return JSON.parse(data);
        }
        catch (error) {
            const emptyData = {
                races: [],
                competitors: [],
                payments: [],
                registrations: []
            };
            this.writeDatabase(emptyData);
            return emptyData;
        }
    }
    writeDatabase(data) {
        fs.writeFileSync(this.dbPath, JSON.stringify(data, null, 2));
    }
    findAll(collection) {
        const data = this.readDatabase();
        return data[collection];
    }
    findById(collection, id) {
        const data = this.readDatabase();
        return data[collection].find(item => item.id === id);
    }
    create(collection, item) {
        const data = this.readDatabase();
        data[collection].push(item);
        this.writeDatabase(data);
        return item;
    }
    update(collection, id, updates) {
        const data = this.readDatabase();
        const index = data[collection].findIndex(item => item.id === id);
        if (index === -1) {
            return null;
        }
        data[collection][index] = Object.assign(Object.assign(Object.assign({}, data[collection][index]), updates), { updatedAt: new Date() });
        this.writeDatabase(data);
        return data[collection][index];
    }
    delete(collection, id) {
        const data = this.readDatabase();
        const index = data[collection].findIndex(item => item.id === id);
        if (index === -1) {
            return false;
        }
        data[collection].splice(index, 1);
        this.writeDatabase(data);
        return true;
    }
    findBy(collection, criteria) {
        const data = this.readDatabase();
        return data[collection].filter(item => {
            return Object.keys(criteria).every(key => item[key] === criteria[key]);
        });
    }
    findOneBy(collection, criteria) {
        const results = this.findBy(collection, criteria);
        return results.length > 0 ? results[0] : undefined;
    }
    count(collection) {
        const data = this.readDatabase();
        return data[collection].length;
    }
    countBy(collection, criteria) {
        return this.findBy(collection, criteria).length;
    }
};
exports.JsonPersistenceService = JsonPersistenceService;
exports.JsonPersistenceService = JsonPersistenceService = __decorate([
    (0, common_1.Injectable)()
], JsonPersistenceService);
//# sourceMappingURL=json-persistence.service.js.map