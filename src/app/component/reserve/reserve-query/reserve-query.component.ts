import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckBalanceCommand } from 'src/app/commands/CheckBalanceCommand';
import { PayReserveCommand } from 'src/app/commands/PayReserveCommand';
import { Reserve } from 'src/app/domain/Reserve';
import { ReserveService } from 'src/service/reserve.service';
import { UtilService } from 'src/service/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserve-query',
  templateUrl: './reserve-query.component.html',
  styleUrls: ['./reserve-query.component.css']
})
export class ReserveQueryComponent implements OnInit {

  public reserve: Reserve;
  public reserveTemp: Reserve;
  public reserveId: string | null;
  public checkBalanceCommand: CheckBalanceCommand;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    public reserveService: ReserveService,
    public utilService: UtilService) {
  }

  async ngOnInit() {
    this.reserveId = this.activatedRoute.snapshot.paramMap.get("id");
    await this.getReserve();
  }

  async getReserve() {
    await this.reserveService.GetById(this.reserveId).subscribe(dataReserve => {
      this.reserveTemp = dataReserve;

      // Verifica si es una reserva activa
      if (this.reserveTemp.reserveStatus == 'Active') {
        this.checkBalanceCommand = new CheckBalanceCommand(this.reserveTemp.licensePlate);

        this.reserveService.CheckBalanceAsync(this.checkBalanceCommand).subscribe(dataCheckBalance => {
          console.log(dataCheckBalance);
          this.reserve = dataCheckBalance;
        }, error => {
          this.router.navigate(['/principal']);
          this.utilService.errorHandler(error);
        });
      } else {
        this.reserve = dataReserve;
      }
    }, error => {
      this.router.navigate(['/principal']);
      this.utilService.errorHandler(error);
    });
  }

  confirmPayment(): void {
    Swal.fire({
      title: '¿Deseas pagar la reserva?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: `Pagar`,
    }).then((result) => {
      if (result.isConfirmed) {
        let payReserveCommand: PayReserveCommand = new PayReserveCommand(this.reserveId);

        this.reserveService.PayReserve(payReserveCommand).subscribe(data => {
          Swal.fire('Reserva pagada', '', 'success');
          this.router.navigate(['/reserve-list']);
        }, error => {
          this.router.navigate(['/principal']);
          this.utilService.errorHandler(error);
        });
      }
    });
  }

}
