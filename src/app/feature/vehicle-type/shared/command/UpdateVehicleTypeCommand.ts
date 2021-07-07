export class UpdateVehicleTypeCommand {
    constructor(
        public id: string | null,
        public name: string,
        public hourValue: number,
        public dayValue: number,
        public baseHoursPerDay: number,
        public engineDisplacementCharge: number,
        public engineDisplacementFlagValue: number,
        public numPlaces: number
    ) { }

}
