import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Reserve } from 'src/app/domain/Reserve';
import { Restriction } from '../domain/Restriction';
import { SortEvent } from '../domain/SortEvent';
import { VehicleType } from '../domain/VehicleType';

export type SortColumn = '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { 'asc': 'desc', 'desc': '', '': 'asc' };

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