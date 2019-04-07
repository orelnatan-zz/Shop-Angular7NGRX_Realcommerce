import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductsSelectors } from '../../../Store';
import { AsyncPipe } from '@angular/common';

import { AppState } from '../../../Store/AppState.model';
import { Load } from '../../../Shop/Models/Load.model';


@Component({
  selector: 'header',
  templateUrl: './Header.component.html',
  styleUrls: ['./Header.component.scss'],
  providers: [ AsyncPipe, ]
})

export class Header {
    @Output() load: EventEmitter<Load> = new EventEmitter();
    @Output() view: EventEmitter<string> = new EventEmitter();
    @Output() refresh: EventEmitter<void> = new EventEmitter();

    viewMode$: Observable<string>;
    typeShown$: Observable<string>;
    sort$: Observable<string>;
    filter$: Observable<string>;

    constructor(
        private store$: Store<AppState>,
        private asyncPipe: AsyncPipe
    ){
        this.viewMode$ = this.store$.select (
			ProductsSelectors.getProductsViewMode,
        );

        this.typeShown$ = this.store$.select (
			ProductsSelectors.getTypeShown,
        );

        this.sort$ = this.store$.select (
			ProductsSelectors.getSortDirection,
        );

        this.filter$ = this.store$.select (
			ProductsSelectors.getTextFilter,
        );
    }

    filterByText(textFilter: string): void {        
        this.loadRequest({
            type: this.asyncPipe.transform(this.typeShown$),
            direction: this.asyncPipe.transform(this.sort$),
            textFilter: textFilter
        });
    }

    filterByType(type: string): void {        
        this.loadRequest({
            type: type,
            direction: this.asyncPipe.transform(this.sort$),
            textFilter: this.asyncPipe.transform(this.filter$)
        });
    }

    changeSortDirection(direction: string): void {
        this.loadRequest({
            type: this.asyncPipe.transform(this.typeShown$),
            direction: direction,
            textFilter: this.asyncPipe.transform(this.filter$)
        });
    }

    loadRequest(load: Load): void {
        this.load.emit(load);
    }
}
