"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Competitor = exports.ShirtSize = exports.ShirtType = void 0;
var ShirtType;
(function (ShirtType) {
    ShirtType["COTTON"] = "COTTON";
    ShirtType["POLYESTER"] = "POLYESTER";
    ShirtType["COTTON_BLEND"] = "COTTON_BLEND";
    ShirtType["DRI_FIT"] = "DRI_FIT";
})(ShirtType || (exports.ShirtType = ShirtType = {}));
var ShirtSize;
(function (ShirtSize) {
    ShirtSize["XS"] = "XS";
    ShirtSize["S"] = "S";
    ShirtSize["M"] = "M";
    ShirtSize["L"] = "L";
    ShirtSize["XL"] = "XL";
    ShirtSize["XXL"] = "XXL";
})(ShirtSize || (exports.ShirtSize = ShirtSize = {}));
class Competitor {
    constructor(data = {}) {
        this.id = data.id || '';
        this.firstName = data.firstName || '';
        this.lastName = data.lastName || '';
        this.email = data.email || '';
        this.phone = data.phone || '';
        this.shirtType = data.shirtType || ShirtType.COTTON;
        this.shirtSize = data.shirtSize || ShirtSize.M;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}
exports.Competitor = Competitor;
//# sourceMappingURL=competitor.entity.js.map