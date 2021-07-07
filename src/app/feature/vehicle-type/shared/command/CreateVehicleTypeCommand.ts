export class CreateVehicleTypeCommand {
    constructor(
        public name: string,
        public hourValue: number,
        public dayValue: number,
        public baseHoursPerDay: number,
        public engineDisplacementCharge: number,
        public engineDisplacementFlagValue: number,
        public numPlaces: number
    ) { }

}
