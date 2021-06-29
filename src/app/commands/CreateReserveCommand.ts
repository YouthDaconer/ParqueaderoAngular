export class CreateReserveCommand {

    constructor(
        public licensePlate: string,
        public engineDisplacement: number,
        public vehicleTypeId: string
    ) { }
}
