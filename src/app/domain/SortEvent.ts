import { SortColumn, SortDirection } from "../directives/sortable.directive";

export interface SortEvent {
    column: SortColumn;
    direction: SortDirection;
  }
  