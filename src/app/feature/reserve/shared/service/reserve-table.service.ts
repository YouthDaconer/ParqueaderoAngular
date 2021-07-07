import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { Reserve } from 'src/app/feature/reserve/shared/model/Reserve';
import { debounceTime, delay, switchMap, tap } from 'rxjs/Operators';
import { ReserveService } from './reserve.service';
import { UtilService } from '../../../../shared/service/util.service';
import { VehicleType } from 'src/app/feature/vehicle-type/shared/model/VehicleType';
import { SortColumn, SortDirection } from 'src/app/shared/directivas/tablas/directiva/sortable.directive';

interface SearchResult {
    reserves: Reserve[];
    total: number;
}

export interface StateReserve {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
}

const compare = (v1: string | number | VehicleType, v2: string | number | VehicleType) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(reserves: Reserve[], column: SortColumn, direction: string): Reserve[] {
    if (direction === '' || column === '') {
        return reserves;
    } else {
        return [...reserves].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

function matches(reserve: Reserve, term: string, pipe: PipeTransform) {
    return reserve.licensePlate.toLowerCase().includes(term) ||
        reserve.vehicleType.name.toLowerCase().includes(term) ||
        reserve.reserveStatus.toLowerCase().includes(term) ||
        pipe.transform(reserve.totalValue).includes(term);
}

@Injectable({ providedIn: 'root' })
export class ReserveTableService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _reserves$ = new BehaviorSubject<Reserve[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: StateReserve = {
        page: 1,
        pageSize: 4,
        searchTerm: '',
        sortColumn: '',
        sortDirection: ''
    };

    constructor(private pipe: DecimalPipe,
        private reserveService: ReserveService,
        private utilService: UtilService) {
        this.reserveService.GetAll().subscribe(data => {
            if (data.length > 0) {
                this._search$.pipe(
                    tap(() => this._loading$.next(true)),
                    debounceTime(200),
                    switchMap(() => this._search(data)),
                    delay(200),
                    tap(() => this._loading$.next(false))
                ).subscribe(result => {
                    this._reserves$.next(result.reserves);
                    this._total$.next(result.total);
                });

                this._search$.next();
            }
        }, error => {
            this.utilService.errorHandler(error);
        });
    }

    get reserves$() { return this._reserves$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }

    set page(page: number) { this._set({ page }); }
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    set searchTerm(searchTerm: string) {
        this._set({ searchTerm });
    }
    set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

    private _set(patch: Partial<StateReserve>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(reservesGet: any): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let reserves = sort(reservesGet, sortColumn, sortDirection);

        // 2. filter
        reserves = reserves.filter(reserve => matches(reserve, searchTerm, this.pipe));
        const total = reserves.length;

        // 3. paginate
        reserves = reserves.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ reserves, total });
    }
}