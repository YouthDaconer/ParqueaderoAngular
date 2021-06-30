import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform, ViewChildren, QueryList } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/Operators';
import { NgbdSortableHeader } from 'src/app/directives/sortable.directive';
import { Reserve } from 'src/app/domain/Reserve';
import { SortEvent } from 'src/app/domain/SortEvent';
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
    public reserveTableService: ReserveTableService,
    private utilService: UtilService) {
    if (this.reservesRaw.length > 0) {
      this.populationData();
    }
    /*this.reserves$ = reserveTableService.reserves$;
    this.total$ = reserveTableService.total$;*/
  }

  async ngOnInit() {
    await this.refreshReserves();
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

  async refreshReserves() {
    this.reserveService.GetAll().subscribe(data => {
      if (data.length > 0) {
        this.reservesRaw = data;
        this.populationData();
      }
    }, error => {
      this.utilService.errorHandler(error);
    });
  }

  populationData() {
    if (this.reservesRaw.length > 0) {
      this.collectionSize = this.reservesRaw.length;
      this.reserves$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => search(text, this.pipe,
          this.reservesRaw.map((reserve, i) => ({ id: i + 1, ...reserve }))
            .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize)))
      );
    }
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
