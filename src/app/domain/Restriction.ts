export class Restriction {

    constructor(
        public id: string|undefined,
        public dayOfWeek: number,
        public termination: number,
        public vehicleTypeId: string
    ) { }
}
