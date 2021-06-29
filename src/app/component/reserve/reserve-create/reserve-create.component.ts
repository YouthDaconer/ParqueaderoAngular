import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateReserveCommand } from 'src/app/commands/CreateReserveCommand';
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
      'LicensePlate': ['', [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern(this.licensePlatePattern)]],
      'VehicleTypeId': ['', [Validators.required]],
      'EngineDisplacement': ['', [Validators.pattern("^[0-9]*$")]]
    });
  }

  loadFormData() {
    this.formGroup.reset({
      LicensePlate: '',
      EngineDisplacement: '',
      VehicleTypeId: ''
    });
  };

  onSubmit(post: any) {
    this.post = post;
  }

  getErrorLicensePlate() {
    return this.formGroup.get('LicensePlate').hasError('required') ? 'La placa es requerida' :
      this.formGroup.get('LicensePlate').hasError('minlength') ? 'Mínimo 6 caracteres' :
        this.formGroup.get('LicensePlate').hasError('pattern') ? 'Escriba una placa válida Ej: ABC123' :
          this.formGroup.get('LicensePlate').hasError('maxlength') ? 'Máximo 6 caracteres' : '';
  }

  getErrorVehicleType() {
    return this.formGroup.get('LicensePlate').hasError('required') ? 'El tipo de vehículo es requerido' : '';
  }

  getErrorEngineDisplacement() {
    return this.formGroup.get('EngineDisplacement').hasError('pattern') ? 'Digite solo números' : '';
  }

  get licensePlateInvalid() {
    return (
      this.formGroup.get('LicensePlate').invalid &&
      this.formGroup.get('LicensePlate').touched
    );
  }

  get vehicleTypeInvalid() {
    if (this.formGroup.get('VehicleTypeId').value == '9b5b3e45-b28f-45a6-9403-d1133aa29846' &&
      (!Boolean(this.formGroup.get('EngineDisplacement').value) ||
        this.formGroup.get('EngineDisplacement').value == 0)) {

      return (this.formGroup.get('EngineDisplacement').invalid &&
        this.formGroup.get('EngineDisplacement').touched);
    }

    return (
      this.formGroup.get('VehicleTypeId').invalid &&
      this.formGroup.get('VehicleTypeId').touched
    );
  }

  get engineDisplacementInvalid() {
    return (
      this.formGroup.get('EngineDisplacement').invalid &&
      this.formGroup.get('EngineDisplacement').touched
    );
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
