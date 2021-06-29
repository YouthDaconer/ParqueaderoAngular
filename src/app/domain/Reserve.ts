export class Reserve {

    constructor(
        public id: string|undefined,
        public licensePlate: string,
        public entryDate: string,
        public departureDate: string,
        public hourValue: number,
        public dayValue: number,
        public reserveStatus: string,
        public engineDisplacement: number,
        public engineDisplacementCharge: number,
        public engineDisplacementFlagValue: number,
        public baseHoursPerDay: number,
        public totalValue: number,
        public vehicleTypeId: string
    ) { }
}
