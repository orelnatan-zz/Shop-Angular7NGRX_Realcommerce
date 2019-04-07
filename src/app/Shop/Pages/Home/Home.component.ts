import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ProductsActions, ProductsSelectors } from '../../../Store';

import { AppState } from '../../../Store/AppState.model';
import { Product } from '../../Models/Product.model';
import { Update } from '../../Models/Update.model';
import { Load } from '../../Models/Load.model';

@Component({
  selector: 'home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})

export class Home implements OnInit {
    allProducts$: Observable<Product[]>;
    viewMode$: Observable<string>;

    constructor(
        private store$: Store<AppState>,
        private router: Router
    ){
        this.allProducts$ = this.store$.select (
			ProductsSelectors.getAllProducts,
        );

        this.viewMode$ = this.store$.select (
			ProductsSelectors.getProductsViewMode,
        );
    }

    ngOnInit(): void {
        this.loadProducts({
            type: "*",
            direction: "asc",
            textFilter: null,
        })
    }

    loadProducts(load: Load): void {
        this.store$.dispatch(
			new ProductsActions.Load({
                load
            })
        );
    }

    transformView(mode: string): void {
        this.store$.dispatch(
			new ProductsActions.View({
                mode: mode
            })
        )
    }
    
    refreshData(): void {
        this.store$.dispatch(
			new ProductsActions.Refresh()
        );
    }

    navigateToProductPage(imdbID: string): void {
        this.router.navigate(['/Product-view' ], {
            queryParams: {
                imdbID: imdbID,
            }
        })
    }

    handleUpdate(update: Update): void {
        this.store$.dispatch(               // We don't have an api for this!!.
			new ProductsActions.Update({
                update
            })
        )            
    }
}
