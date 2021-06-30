import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateReserveCommand } from 'src/app/commands/CreateReserveCommand';
import { VehicleType } from 'src/app/domain/VehicleType';
import { DataSharingService } from 'src/service/data-sharing.service';
import { ReserveService } from 'src/service/reserve.service';
import { UtilService } from 'src/service/util.service';
import { VehicleTypeService } from 'src/service/vehicle-type.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserve-create',
  templateUrl: './reserve-create.component.html',
  styleUrls: ['./reserve-create.component.css']
})
export class ReserveCreateComponent implements OnInit {

  public licensePlatePattern: string = "^([A-Z]{3}\\d{3})$";
  public vehicleTypes: any[] = new Array<any>();
  public formGroup: FormGroup;
  public post: any = '';
  public reserve: CreateReserveCommand = new CreateReserveCommand("", 0, "");
  public vehicleTypeSelected: VehicleType;

  constructor(private formBuilder: FormBuilder,
    private vehicleTypeService: VehicleTypeService,
    private reserveService: ReserveService,
    private utilService: UtilService,
    private dataSharingService: DataSharingService,
    private router: Router) { }

  async ngOnInit() {
    await this.getVehicleTypes();
    this.createForm();
    this.loadFormData();
  }

  public async getVehicleTypes() {
    this.vehicleTypeService.GetAll().subscribe(data => {
      this.vehicleTypes = data;
      console.log(this.vehicleTypes);
    }, error => {
      this.utilService.errorHandler(error);
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'licensePlate': ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern(this.licensePlatePattern)]],
      'vehicleTypeId': ['', [Validators.required]],
      'engineDisplacement': ['', [Validators.pattern("^[0-9]*$")]]
    });
  }

  loadFormData() {
    this.formGroup.reset({
      licensePlate: '',
      engineDisplacement: '',
      vehicleTypeId: ''
    });
  };

  onSubmit(post: any) {
    this.post = post;
  }

  getErrorLicensePlate() {
    return this.formGroup.get('licensePlate').hasError('required') ? 'La placa es requerida' :
      this.formGroup.get('licensePlate').hasError('minlength') ? 'Mínimo 6 caracteres' :
        this.formGroup.get('licensePlate').hasError('pattern') ? 'Escriba una placa válida Ej: ABC123' :
          this.formGroup.get('licensePlate').hasError('maxlength') ? 'Máximo 6 caracteres' : '';
  }

  getErrorVehicleType() {
    return this.formGroup.get('licensePlate').hasError('required') ? 'El tipo de vehículo es requerido' : '';
  }

  getErrorEngineDisplacement() {
    return this.formGroup.get('engineDisplacement').hasError('pattern') ? 'Digite solo números' :
      this.vehicleTypeSelected.engineDisplacementFlagValue != null ? 'El valor del cilindraje es requerido' : '';
  }

  get licensePlateInvalid() {
    return (
      this.formGroup.get('licensePlate').invalid &&
      this.formGroup.get('licensePlate').touched
    );
  }

  get vehicleTypeInvalid() {
    return (
      this.formGroup.get('vehicleTypeId').invalid &&
      this.formGroup.get('vehicleTypeId').touched
    );
  }

  get engineDisplacementInvalid() {
    return (
      this.formGroup.get('engineDisplacement').invalid &&
      this.formGroup.get('engineDisplacement').touched
    );
  }

  engineDisplacementRequired() {
    this.reserve.vehicleTypeId = this.vehicleTypeSelected.id;

    let condition: boolean = this.vehicleTypeSelected.engineDisplacementFlagValue != null &&
      (this.formGroup.get('engineDisplacement').value == '' ||
        this.formGroup.get('engineDisplacement').value == 0);

    if (condition) {
      this.formGroup.controls['engineDisplacement'].setErrors({ 'incorrect': true });
      this.formGroup.controls['engineDisplacement'].markAsTouched;
    } else {
      this.formGroup.controls['engineDisplacement'].setErrors(null);
      this.formGroup.controls['engineDisplacement'].markAsTouched;
    }
  }

  createReserve() {
    if (this.formGroup.invalid) {
      return Object.values(this.formGroup.controls).forEach(x => {
        x.markAsTouched();
      });
    } else {
      this.reserveService.CreateReserve(this.reserve).subscribe(data => {
        this.router.navigate(['/reserve-list']);
        Swal.fire(
          'Reserva creada',
          'Se ha registrado la reserva para el vehículo',
          'success'
        );
      }, error => {
        this.utilService.errorHandler(error);
      });
    }
  }

}
