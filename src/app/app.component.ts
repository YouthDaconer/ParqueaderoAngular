import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReserveService } from 'src/service/reserve.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CheckBalanceCommand } from './commands/CheckBalanceCommand';
import { UtilService } from 'src/service/util.service';
import { DataSharingService } from 'src/service/data-sharing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'parqueadero-front';
  public licensePlatePattern: string = "^([A-Z]{3}\\d{3})$";
  public licensePlate: string | null = "";
  public formGroup: FormGroup;
  public post: any = '';
  public loading: boolean = false;
  public checkBalanceCommand: CheckBalanceCommand;

  constructor(private modal: NgbModal,
    private formBuilder: FormBuilder,
    public reserveService: ReserveService,
    private router: Router,
    public utilService: UtilService,
    private dataSharingService: DataSharingService
  ) {
    // Comunicación entre componentes
    this.dataSharingService.currentMessage.subscribe(mensaje => {
      switch (mensaje) {
        default:
          break;
      }
    })
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'licensePlate': [null, [Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern(this.licensePlatePattern)]],
      'validate': ''
    });
  }

  onSubmit(post: any) {
    this.post = post;
  }

  getErrorLicensePlate() {
    return this.formGroup.get('licensePlate')!.hasError('required') ? 'La placa es requerida' :
      this.formGroup.get('licensePlate')!.hasError('minlength') ? 'Mínimo 6 caracteres' :
        this.formGroup.get('licensePlate')!.hasError('pattern') ? 'Escriba una placa válida Ej: ABC123' :
          this.formGroup.get('licensePlate')!.hasError('maxlength') ? 'Máximo 6 caracteres' : '';
  }

  openModalQueryReserve(modalQueryReserve: any): void {
    this.modal.open(modalQueryReserve, { centered: true, size: 'sm' });
  }

  searchReserve(): void {
    if (this.formGroup.status === "VALID") {
      // Busca la reserva
      this.checkBalanceCommand = new CheckBalanceCommand(this.licensePlate);

      this.reserveService.CheckBalanceAsync(this.checkBalanceCommand).subscribe(data => {
        this.router.navigate(["/reserve-query", data.id])
          .then(() => {
            window.location.reload();
          });
      }, error => {
        this.utilService.errorHandler(error);
      });
    }
  }


}
