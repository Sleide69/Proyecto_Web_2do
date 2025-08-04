export declare enum RaceType {
    MARATHON = "MARATHON",
    HALF_MARATHON = "HALF_MARATHON",
    TEN_K = "10K",
    FIVE_K = "5K",
    TRAIL = "TRAIL",
    TRIATHLON = "TRIATHLON",
    CYCLING = "CYCLING"
}
export declare enum RaceStatus {
    PLANNED = "PLANNED",
    OPEN_REGISTRATION = "OPEN_REGISTRATION",
    CLOSED_REGISTRATION = "CLOSED_REGISTRATION",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare class Race {
    id: string;
    name: string;
    description?: string;
    type: RaceType;
    eventDate: Date;
    registrationStartDate: Date;
    registrationEndDate: Date;
    location: string;
    distance: string;
    maxParticipants: number;
    registrationFee: number;
    status: RaceStatus;
    createdAt: Date;
    updatedAt: Date;
    constructor(data?: Partial<Race>);
}
