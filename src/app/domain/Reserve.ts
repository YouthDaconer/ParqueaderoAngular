import { VehicleType } from "./VehicleType";

export interface Reserve {
    id: string | undefined,
    licensePlate: string,
    entryDate: string,
    departureDate: string,
    hourValue: number,
    dayValue: number,
    reserveStatus: string,
    engineDisplacement: number,
    engineDisplacementCharge: number,
    engineDisplacementFlagValue: number,
    baseHoursPerDay: number,
    totalValue: number,
    vehicleTypeId: string,
    vehicleType: VehicleType
}
