export class VehicleType {

    constructor(
        public Id: string|undefined,
        public Name: string,
        public HourValue: number,
        public DayValue: number,
        public BaseHoursPerDay: number,
        public EngineDisplacementCharge: number,
        public EngineDisplacementFlagValue: number,
        public NumPlaces: number
    ) { }
}
