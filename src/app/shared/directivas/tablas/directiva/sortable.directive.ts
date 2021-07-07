import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Reserve } from 'src/app/feature/reserve/shared/model/Reserve';
import { Restriction } from '../../../../feature/restriction/shared/model/Restriction';
import { VehicleType } from '../../../../feature/vehicle-type/shared/model/VehicleType';

export type SortColumn = keyof Reserve | keyof Restriction | keyof VehicleType | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {
  @HostListener('keydown', ['$event.target'])
  onKeyDown(e) {
    console.log(e);
    if (e.which === 13) {
      this.rotate();
    }
  }

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}