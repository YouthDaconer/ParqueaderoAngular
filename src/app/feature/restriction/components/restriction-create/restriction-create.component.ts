import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleType } from 'src/app/feature/vehicle-type/shared/model/VehicleType';
import { RestrictionService } from 'src/app/feature/restriction/shared/service/restriction.service';
import { UtilService } from 'src/app/shared/service/util.service';
import Swal from 'sweetalert2';
import { CreateRestrictionCommand } from '../../shared/command/CreateRestrictionCommand';

@Component({
  selector: 'app-restriction-create',
  templateUrl: './restriction-create.component.html',
  styleUrls: ['./restriction-create.component.css']
})
export class RestrictionCreateComponent implements OnInit {

  public formGroup: FormGroup;
  public post: any = '';
  public restriction: CreateRestrictionCommand = new CreateRestrictionCommand(0, 0);
  public vehicleTypeSelected: VehicleType;
  public days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
  public dayOfWeekSelected: number;

  constructor(private formBuilder: FormBuilder,
    private restrictionService: RestrictionService,
    private utilService: UtilService,
    private router: Router) { }

  async ngOnInit() {
    this.createForm();
    this.loadFormData();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'dayOfWeek': ['', [Validators.required]],
      'termination': ['', [
        Validators.pattern("^[0-9]$"),
        Validators.required]]
    });
  }

  loadFormData() {
    this.formGroup.reset({
      dayOfWeek: '',
      termination: ''
    });
  };

  onSubmit(post: any) {
    this.post = post;
  }

  getErrorDayOfWeek() {
    return this.formGroup.get('dayOfWeek').hasError('required') ? 'El día es requerido' : '';
  }

  getErrorTermination() {
    return this.formGroup.get('termination').hasError('pattern') ? 'Digite un solo número ente 0 y 9' :
      this.formGroup.get('termination').hasError('required') ? 'La terminación de la placa es requerida' : '';
  }

  get dayOfWeekInvalid() {
    return (
      this.formGroup.get('dayOfWeek').invalid &&
      this.formGroup.get('dayOfWeek').touched
    );
  }

  get terminationInvalid() {
    return (
      this.formGroup.get('termination').invalid &&
      this.formGroup.get('termination').touched
    );
  }

  createRestriction() {
    if (this.formGroup.invalid) {
      return Object.values(this.formGroup.controls).forEach(x => {
        x.markAsTouched();
      });
    } else {
      this.restriction.dayOfWeek = this.dayOfWeekSelected;
      this.restrictionService.CreateRestriction(this.restriction).subscribe(data => {
        this.router.navigate(['/restriction-list']);
        Swal.fire(
          'Restrición creada',
          'Se ha registrado la restricción para el día',
          'success'
        );
      }, error => {
        this.utilService.errorHandler(error);
      });
    }
  }

}
