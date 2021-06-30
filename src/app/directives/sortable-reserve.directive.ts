import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Reserve } from 'src/app/domain/Reserve';

export type SortColumnReserve = keyof Reserve | '';
export type SortDirectionReserve = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirectionReserve } = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEventReserve {
  column: SortColumnReserve;
  direction: SortDirectionReserve;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeaderReserve {
  @HostListener('keydown', ['$event.target'])
  onKeyDown(e) {
    console.log(e);
    if (e.which === 13) {
      this.rotate();
    }
  }

  @Input() sortable: SortColumnReserve = '';
  @Input() direction: SortDirectionReserve = '';
  @Output() sort = new EventEmitter<SortEventReserve>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}