import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { Restriction } from 'src/app/domain/Restriction';
import { debounceTime, delay, switchMap, tap } from 'rxjs/Operators';
import { RestrictionService } from './restriction.service';
import { UtilService } from './util.service';
import { VehicleType } from 'src/app/domain/VehicleType';
import { SortColumn, SortDirection } from 'src/app/directives/sortable.directive';

interface SearchResult {
    restrictions: Restriction[];
    total: number;
}

export interface StateRestriction {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(restrictions: Restriction[], column: SortColumn, direction: string): Restriction[] {
    if (direction === '' || column === '') {
        return restrictions;
    } else {
        return [...restrictions].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

function matches(restriction: Restriction, term: string, pipe: PipeTransform) {
    let days = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];
    return days[restriction.dayOfWeek - 1].toLowerCase().includes(term) ||
        pipe.transform(restriction.termination).includes(term);
}

@Injectable({ providedIn: 'root' })
export class RestrictionTableService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _restrictions$ = new BehaviorSubject<Restriction[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: StateRestriction = {
        page: 1,
        pageSize: 4,
        searchTerm: '',
        sortColumn: '',
        sortDirection: ''
    };

    constructor(private pipe: DecimalPipe,
        private restrictionService: RestrictionService,
        private utilService: UtilService) {
        this.restrictionService.GetAll().subscribe(data => {
            if (data.length > 0) {
                this._search$.pipe(
                    tap(() => this._loading$.next(true)),
                    debounceTime(200),
                    switchMap(() => this._search(data)),
                    delay(200),
                    tap(() => this._loading$.next(false))
                ).subscribe(result => {
                    this._restrictions$.next(result.restrictions);
                    this._total$.next(result.total);
                });

                this._search$.next();
            }
        }, error => {
            this.utilService.errorHandler(error);
        });
    }

    test(): void {
        this.restrictionService.GetAll().subscribe(data => {
            if (data.length > 0) {
                this._search$.pipe(
                    tap(() => this._loading$.next(true)),
                    debounceTime(200),
                    switchMap(() => this._search(data)),
                    delay(200),
                    tap(() => this._loading$.next(false))
                ).subscribe(result => {
                    this._restrictions$.next(result.restrictions);
                    this._total$.next(result.total);
                });

                this._search$.next();
            }
        }, error => {
            this.utilService.errorHandler(error);
        });
    }

    get restrictions$() { return this._restrictions$.asObservable(); }
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

    private _set(patch: Partial<StateRestriction>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(restrictionsGet: any): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let restrictions = sort(restrictionsGet, sortColumn, sortDirection);

        // 2. filter
        restrictions = restrictions.filter(restriction => matches(restriction, searchTerm, this.pipe));
        const total = restrictions.length;

        // 3. paginate
        restrictions = restrictions.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ restrictions, total });
    }
}