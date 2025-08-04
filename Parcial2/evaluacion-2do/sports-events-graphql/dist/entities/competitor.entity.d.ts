export declare enum ShirtType {
    COTTON = "COTTON",
    POLYESTER = "POLYESTER",
    COTTON_BLEND = "COTTON_BLEND",
    DRI_FIT = "DRI_FIT"
}
export declare enum ShirtSize {
    XS = "XS",
    S = "S",
    M = "M",
    L = "L",
    XL = "XL",
    XXL = "XXL"
}
export declare class Competitor {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    shirtType: ShirtType;
    shirtSize: ShirtSize;
    createdAt: Date;
    updatedAt: Date;
    fullName: string;
    constructor(data?: Partial<Competitor>);
}
