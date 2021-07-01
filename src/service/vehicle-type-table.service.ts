import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { VehicleType } from 'src/app/domain/VehicleType';
import { debounceTime, delay, switchMap, tap } from 'rxjs/Operators';
import { UtilService } from './util.service';
import { SortColumn, SortDirection } from 'src/app/directives/sortable.directive';
import { VehicleTypeService } from './vehicle-type.service';

interface SearchResult {
    vehicleTypes: VehicleType[];
    total: number;
}

export interface StateVehicleType {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(vehicleTypes: VehicleType[], column: SortColumn, direction: string): VehicleType[] {
    if (direction === '' || column === '') {
        return vehicleTypes;
    } else {
        return [...vehicleTypes].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

function matches(vehicleType: VehicleType, term: string, pipe: PipeTransform) {
    return vehicleType.name.toLowerCase().includes(term) ||
        pipe.transform(vehicleType.numPlaces).includes(term) ||
        pipe.transform(vehicleType.hourValue).includes(term) ||
        pipe.transform(vehicleType.dayValue).includes(term);
}

@Injectable({ providedIn: 'root' })
export class VehicleTypeTableService {
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _vehicleTypes$ = new BehaviorSubject<VehicleType[]>([]);
    private _total$ = new BehaviorSubject<number>(0);

    private _state: StateVehicleType = {
        page: 1,
        pageSize: 4,
        searchTerm: '',
        sortColumn: '',
        sortDirection: ''
    };

    constructor(private pipe: DecimalPipe,
        private vehicleTypeService: VehicleTypeService,
        private utilService: UtilService) {
            this.getVehicleTypes();
    }

    getVehicleTypes(): void {
        this.vehicleTypeService.GetAll().subscribe(data => {
            if (data.length > 0) {
                this._search$.pipe(
                    tap(() => this._loading$.next(true)),
                    debounceTime(200),
                    switchMap(() => this._search(data)),
                    delay(200),
                    tap(() => this._loading$.next(false))
                ).subscribe(result => {
                    this._vehicleTypes$.next(result.vehicleTypes);
                    this._total$.next(result.total);
                });

                this._search$.next();
            }
        }, error => {
            this.utilService.errorHandler(error);
        });
    }

    get vehicleTypes$() { return this._vehicleTypes$.asObservable(); }
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

    private _set(patch: Partial<StateVehicleType>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(vehicleTypesGet: any): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let vehicleTypes = sort(vehicleTypesGet, sortColumn, sortDirection);

        // 2. filter
        vehicleTypes = vehicleTypes.filter(vehicleType => matches(vehicleType, searchTerm, this.pipe));
        const total = vehicleTypes.length;

        // 3. paginate
        vehicleTypes = vehicleTypes.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ vehicleTypes, total });
    }
}