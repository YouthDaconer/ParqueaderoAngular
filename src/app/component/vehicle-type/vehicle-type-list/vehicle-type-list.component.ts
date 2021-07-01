import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform, ViewChildren, QueryList } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/Operators';
import { NgbdSortableHeader, SortEvent } from 'src/app/directives/sortable.directive';
import { VehicleType } from 'src/app/domain/VehicleType';
import { VehicleTypeTableService } from 'src/service/vehicle-type-table.service';
import { VehicleTypeService } from 'src/service/vehicle-type.service';
import { UtilService } from 'src/service/util.service';

@Component({
  selector: 'app-vehicle-type-list',
  templateUrl: './vehicle-type-list.component.html',
  styleUrls: ['./vehicle-type-list.component.css'],
  providers: [DecimalPipe, VehicleTypeTableService]
})

export class VehicleTypeListComponent implements OnInit {

  vehicleTypes$: Observable<VehicleType[]>;
  total$: Observable<number>;
  vehicleTypesRaw: VehicleType[] = [];
  filter = new FormControl('');
  page = 1;
  pageSize = 4;
  collectionSize = 1;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private pipe: DecimalPipe,
    private vehicleTypeService: VehicleTypeService,
    private router: Router,
    public vehicleTypeTableService: VehicleTypeTableService,
    private utilService: UtilService) {
    this.vehicleTypes$ = vehicleTypeTableService.vehicleTypes$;
    this.total$ = vehicleTypeTableService.total$;
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

    this.vehicleTypeTableService.sortColumn = column;
    this.vehicleTypeTableService.sortDirection = direction;
  }

  showVehicleType(vehicleTypeId: string): void {
    this.router.navigate(["/vehicle-type-edit", vehicleTypeId]);
  }

}
