export class Reserve {

    constructor(
        public Id: string|undefined,
        public LicensePlate: string,
        public EntryDate: string,
        public DepartureDate: string,
        public HourValue: number,
        public DayValue: number,
        public ReserveStatus: string,
        public EngineDisplacement: number,
        public EngineDisplacementCharge: number,
        public EngineDisplacementFlagValue: number,
        public BaseHoursPerDay: number,
        public TotalValue: number,
        public VehicleTypeId: string
    ) { }
}
