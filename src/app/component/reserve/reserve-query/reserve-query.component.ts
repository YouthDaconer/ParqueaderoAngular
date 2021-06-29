import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckBalanceCommand } from 'src/app/commands/CheckBalanceCommand';
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
  public checkBalanceCommand: CheckBalanceCommand;
  public licensePlate: string | null;

  constructor(private activatedRoute: ActivatedRoute,
    public reserveService: ReserveService,
    public utilService: UtilService) {
  }

  ngOnInit(): void {
    this.licensePlate = this.activatedRoute.snapshot.paramMap.get("licensePlate");
    this.checkBalanceCommand = new CheckBalanceCommand(this.licensePlate);

    this.reserveService.CheckBalanceAsync(this.checkBalanceCommand).subscribe(data => {
      this.reserve = data;
    }, error => {
      this.utilService.errorHandler(error);
    });

  }

}
