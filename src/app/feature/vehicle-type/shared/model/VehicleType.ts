import { Restriction } from "../../../restriction/shared/model/Restriction";

export interface VehicleType {
    id: string | undefined,
    name: string,
    hourValue: number,
    dayValue: number,
    baseHoursPerDay: number,
    engineDisplacementCharge: number,
    engineDisplacementFlagValue: number,
    numPlaces: number,
    restrictions: Restriction[]
}
