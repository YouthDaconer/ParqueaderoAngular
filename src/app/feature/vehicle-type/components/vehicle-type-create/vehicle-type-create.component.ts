import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleTypeService } from 'src/app/feature/vehicle-type/shared/service/vehicle-type.service';
import { UtilService } from 'src/app/shared/service/util.service';
import Swal from 'sweetalert2';
import { CreateVehicleTypeCommand } from '../../shared/command/CreateVehicleTypeCommand';

@Component({
  selector: 'app-vehicle-type-create',
  templateUrl: './vehicle-type-create.component.html',
  styleUrls: ['./vehicle-type-create.component.css']
})
export class VehicleTypeCreateComponent implements OnInit {

  public formGroup: FormGroup;
  public post: any = '';
  public vehicleType: CreateVehicleTypeCommand = new CreateVehicleTypeCommand("", 0, 0, 0, 0, 0, 0);

  constructor(private formBuilder: FormBuilder,
    private vehicleTypeService: VehicleTypeService,
    private utilService: UtilService,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.loadFormData();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': ['', [Validators.required,
      Validators.maxLength(30)]],
      'hourValue': ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      'dayValue': ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      'baseHoursPerDay': ['', [Validators.required, Validators.min(1), Validators.max(24), Validators.pattern("^[0-9]$")]],
      'numPlaces': ['', [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
      'engineDisplacementCharge': ['', [Validators.pattern("^[0-9]*$")]],
      'engineDisplacementFlagValue': ['', [Validators.pattern("^[0-9]*$")]]
    });
  }

  loadFormData() {
    this.formGroup.reset({
      name: '',
      hourValue: '',
      dayValue: '',
      baseHoursPerDay: '',
      engineDisplacementCharge: '',
      engineDisplacementFlagValue: '',
      numPlaces: ''
    });
  };

  onSubmit(post: any) {
    this.post = post;
  }

  getErrorName() {
    return this.formGroup.get('name').hasError('required') ? 'El nombre es requerido' :
      this.formGroup.get('name').hasError('maxlength') ? 'Máximo 30 caracteres' : '';
  }

  getErrorHourValue() {
    return this.formGroup.get('hourValue').hasError('required') ? 'El valor de la hora es requerido' :
      this.formGroup.get('hourValue').hasError('pattern') ? 'Digite solo números' : '';
  }

  getErrorDayValue() {
    return this.formGroup.get('dayValue').hasError('required') ? 'El valor del día es requerido' :
      this.formGroup.get('dayValue').hasError('pattern') ? 'Digite solo números' : '';
  }

  getErrorBaseHoursPerDay() {
    return this.formGroup.get('baseHoursPerDay').hasError('required') ? 'El número de horas base el para cálculo del valor por día es requerido' :
      this.formGroup.get('baseHoursPerDay').hasError('min') ? 'Mínimo 1 hora' :
        this.formGroup.get('baseHoursPerDay').hasError('max') ? 'Máximo 24 horas' :
          this.formGroup.get('baseHoursPerDay').hasError('pattern') ? 'Digite solo números' : '';
  }

  getErrorNumPlaces() {
    console.log(this.formGroup.get('engineDisplacementCharge').value);
    return this.formGroup.get('numPlaces').hasError('required') ? 'El número de plazas es requerido' :
      this.formGroup.get('numPlaces').hasError('min') ? 'Mínimo 1 plaza' :
        this.formGroup.get('numPlaces').hasError('pattern') ? 'Digite solo números' : '';
  }

  getErrorEngineDisplacementCharge() {
    return this.formGroup.get('engineDisplacementCharge').hasError('pattern') ? 'Digite solo números' : '';
  }

  getErrorEngineDisplacementFlagValue() {
    return this.formGroup.get('engineDisplacementFlagValue').hasError('pattern') ? 'Digite solo números' :
      this.vehicleType.engineDisplacementFlagValue != null ? 'Este valor es requerido' : '';
  }

  engineDisplacementChargeRequired() {
    if (this.formGroup.get('engineDisplacementCharge').value != null && this.formGroup.get('engineDisplacementCharge').value > 0) {

      if (this.formGroup.get('engineDisplacementFlagValue').value == '' ||
        this.formGroup.get('engineDisplacementFlagValue').value == null ||
        this.formGroup.get('engineDisplacementFlagValue').value <= 0) {

        this.formGroup.controls['engineDisplacementFlagValue'].setErrors({ 'incorrect': true });
        this.formGroup.controls['engineDisplacementFlagValue'].markAsTouched;
      } else {
        this.formGroup.controls['engineDisplacementFlagValue'].setErrors(null);
        this.formGroup.controls['engineDisplacementFlagValue'].markAsTouched;
      }
    } else {
      this.formGroup.controls['engineDisplacementFlagValue'].setErrors(null);
      this.formGroup.controls['engineDisplacementFlagValue'].markAsTouched;
    }
  }

  get nameInvalid() {
    return (
      this.formGroup.get('name').invalid &&
      this.formGroup.get('name').touched
    );
  }

  get hourValueInvalid() {
    return (
      this.formGroup.get('hourValue').invalid &&
      this.formGroup.get('hourValue').touched
    );
  }

  get dayValueInvalid() {
    return (
      this.formGroup.get('dayValue').invalid &&
      this.formGroup.get('dayValue').touched
    );
  }

  get baseHoursPerDayInvalid() {
    return (
      this.formGroup.get('baseHoursPerDay').invalid &&
      this.formGroup.get('baseHoursPerDay').touched
    );
  }

  get engineDisplacementChargeInvalid() {
    return (
      this.formGroup.get('engineDisplacementCharge').invalid &&
      this.formGroup.get('engineDisplacementCharge').touched
    );
  }

  get engineDisplacementFlagValueInvalid() {
    return (
      this.formGroup.get('engineDisplacementFlagValue').invalid &&
      this.formGroup.get('engineDisplacementFlagValue').touched
    );
  }

  get numPlacesInvalid() {
    return (
      this.formGroup.get('numPlaces').invalid &&
      this.formGroup.get('numPlaces').touched
    );
  }

  createVehicleType() {
    this.engineDisplacementChargeRequired();

    if (this.formGroup.invalid) {
      return Object.values(this.formGroup.controls).forEach(x => {
        x.markAsTouched();
      });
    } else {
      if (this.vehicleType.engineDisplacementCharge <= 0 || this.vehicleType.engineDisplacementCharge == null) {
        this.vehicleType.engineDisplacementCharge = 0;
        this.vehicleType.engineDisplacementFlagValue = 0;
      }
      this.vehicleTypeService.CreateVehicleType(this.vehicleType).subscribe(data => {
        this.router.navigate(['/vehicle-type-list']);
        Swal.fire(
          'Tipo de vehículo creado',
          'Se ha registrado el tipo de vehículo',
          'success'
        );
      }, error => {
        this.utilService.errorHandler(error);
      });
    }
  }

}
