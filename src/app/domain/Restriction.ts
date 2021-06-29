export class Restriction {

    constructor(
        public Id: string|undefined,
        public DayOfWeek: number,
        public Termination: number,
        public VehicleTypeId: string
    ) { }
}
