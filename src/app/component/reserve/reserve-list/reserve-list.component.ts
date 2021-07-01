import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform, ViewChildren, QueryList } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/Operators';
import { NgbdSortableHeader, SortEvent } from 'src/app/directives/sortable.directive';
import { Reserve } from 'src/app/domain/Reserve';
import { ReserveTableService } from 'src/service/reserve-table.service';
import { ReserveService } from 'src/service/reserve.service';
import { UtilService } from 'src/service/util.service';

@Component({
  selector: 'app-reserve-list',
  templateUrl: './reserve-list.component.html',
  styleUrls: ['./reserve-list.component.css'],
  providers: [DecimalPipe, ReserveTableService]
})

export class ReserveListComponent implements OnInit {

  reserves$: Observable<Reserve[]>;
  total$: Observable<number>;
  reservesRaw: Reserve[] = [];
  filter = new FormControl('');
  page = 1;
  pageSize = 4;
  collectionSize = 1;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private pipe: DecimalPipe,
    private reserveService: ReserveService,
    private router: Router,
    public reserveTableService: ReserveTableService,
    private utilService: UtilService) {
    this.reserves$ = reserveTableService.reserves$;
    this.total$ = reserveTableService.total$;
  }

  ngOnInit() {
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.reserveTableService.sortColumn = column;
    this.reserveTableService.sortDirection = direction;
  }

  showReserve(reserveId: string): void {
    this.router.navigate(["/reserve-query", reserveId]);
  }

}

function search(text: string, pipe: PipeTransform, reserves: any): Reserve[] {

  return reserves.filter(reserve => {
    const term = text.toLowerCase();
    return reserve.licensePlate.toLowerCase().includes(term) ||
      reserve.vehicleType.name.toLowerCase().includes(term) ||
      reserve.reserveStatus.toLowerCase().includes(term) ||
      pipe.transform(reserve.totalValue).includes(term);
  });
}
