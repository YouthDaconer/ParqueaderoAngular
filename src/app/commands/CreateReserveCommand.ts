export class CreateReserveCommand {

    constructor(
        public LicensePlate: string,
        public EngineDisplacement: number,
        public VehicleTypeId: string
    ) { }
}
