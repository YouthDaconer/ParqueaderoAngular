import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform, ViewChildren, QueryList } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/Operators';
import { DeleteRestrictionCommand } from 'src/app/commands/DeleteRestrictionCommand';
import { NgbdSortableHeader, SortEvent } from 'src/app/directives/sortable.directive';
import { Restriction } from 'src/app/domain/Restriction';
import { RestrictionTableService } from 'src/service/restriction-table.service';
import { RestrictionService } from 'src/service/restriction.service';
import { UtilService } from 'src/service/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restriction-list',
  templateUrl: './restriction-list.component.html',
  styleUrls: ['./restriction-list.component.css'],
  providers: [DecimalPipe, RestrictionTableService]
})

export class RestrictionListComponent implements OnInit {

  restrictions$: Observable<Restriction[]>;
  total$: Observable<number>;
  restrictionsRaw: Restriction[] = [];
  filter = new FormControl('');
  page = 1;
  pageSize = 4;
  collectionSize = 1;
  days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private pipe: DecimalPipe,
    private restrictionService: RestrictionService,
    private router: Router,
    public restrictionTableService: RestrictionTableService,
    private utilService: UtilService) {
    this.restrictions$ = restrictionTableService.restrictions$;
    this.total$ = restrictionTableService.total$;
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

    this.restrictionTableService.sortColumn = column;
    this.restrictionTableService.sortDirection = direction;
  }

  confirmDeleteRestriction(restrictionId: string): void {
    Swal.fire({
      title: '¿Deseas eliminar la restricción?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
    }).then((result) => {
      if (result.isConfirmed) {
        let deleteRestrictionCommand: DeleteRestrictionCommand = new DeleteRestrictionCommand(restrictionId);

        this.restrictionService.DeleteRestriction(deleteRestrictionCommand).subscribe(data => {
          Swal.fire('Restricción eliminada', '', 'success');
          this.restrictionTableService.getRestrictions();
        }, error => {
          this.router.navigate(['/principal']);
          this.utilService.errorHandler(error);
        });
      }
    });
  }

}
