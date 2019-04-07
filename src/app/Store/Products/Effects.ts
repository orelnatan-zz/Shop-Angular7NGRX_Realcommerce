import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map, switchMap, startWith, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { DatePipe } from '@angular/common';
import { Products } from '../../Shop/Services/Products.service';
import * as ProductsActions from './Actions';

import { Product } from '../../Shop/Models/Product.model';
import { AppState } from '../AppState.model';

@Injectable()
export class ProductsEffects {
    constructor(
        private products: Products,
        private actions$: Actions,
        private datePipe: DatePipe,
        private store$: Store<AppState>,
    ){}

    @Effect()
    Load$: Observable<Action> = this.actions$.pipe(
        ofType<ProductsActions.Load>(
            ProductsActions.ActionTypes.LOAD
		),
		switchMap((action: ProductsActions.Load): Observable<Action> => {
			return this.products.getAllProducts().pipe(
				map((products: Array<Product>): ProductsActions.Ready => {
                    products = this.filterByType(products, action.payload.load.type);
                    products = this.sortByDirection(products, action.payload.load.direction);
                    products = this.filterByText(products, action.payload.load.textFilter);

                    return new ProductsActions.Ready({
                        products: products,
					})
				}),
				catchError(() => {
					return observableOf(new ProductsActions.Rejected())
				})
			)
		})
    );

    @Effect({ dispatch: false })
	Refresh: Observable<Action> = this.actions$.pipe(
		ofType<ProductsActions.Refresh>(
			ProductsActions.ActionTypes.REFRESH,
		),
		tap(() => {
            this.products.resetProducts();

            this.store$.dispatch(
                new ProductsActions.Load({
                    load: {
                        type: "*",
                        direction: "asc",
                        textFilter: null,
                    }
                }),
            );
		})
    );

    @Effect()
    Update$: Observable<Action> = this.actions$.pipe(
        ofType<ProductsActions.Update>(
            ProductsActions.ActionTypes.UPDATE
		),
		switchMap((action: ProductsActions.Update): Observable<Action> => {
			return this.products.updateProductTitle(action.payload.update).pipe(
				map((): ProductsActions.Ready => {
                    return new ProductsActions.Ready({
                        products: this.products.products
                    })
				}),
				catchError(() => {
					return observableOf(new ProductsActions.Rejected())
				})
			)
		})
    );
    
    filterByType(products: Array<Product>, type: string): Array<Product> {
        return type == "*" ? products : products.filter((product: Product) => {
            return product.Type == type;
        })
    }
    
    filterByText(products: Array<Product>, text: string): Array<Product> {
        return text ? products.filter((product: Product) => {
            return product.Title.toLocaleUpperCase().includes(text.toUpperCase()) || this.datePipe.transform(product.Year, 'dd/mm/yyyy').includes(text); 
        }) : products;
    }

    sortByDirection(products: Array<Product>, direction: string): Array<Product> {
        return products.sort((arg1, arg2) => {
            const title1 = isNaN ? arg1.Title.toUpperCase() : arg1.Title; 
            const title2 = isNaN ? arg2.Title.toUpperCase() : arg2.Title;
            const action = direction == 'desc' ? ((title1 < title2) ? -1 : ((title1 > title2) ? 1 : 0)) : ((title1 > title2) ? -1 : ((title1 < title2) ? 1 : 0));
            return action;
        });
    }
}