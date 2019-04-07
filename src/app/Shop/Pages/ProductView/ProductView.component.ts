import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation,  } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsActions, ProductsSelectors } from '../../../Store';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from '../../../Store/AppState.model';
import { Product } from '../../Models/Product.model';
import { Observable } from 'rxjs';
import { Load } from '../../Models/Load.model';

const IMAGE_NOT_FOUND_URL: string = "../../../../assets/Images/image-not-available.jpg";

@Component({
  selector: 'product-view',
  templateUrl: './ProductView.component.html',
  styleUrls: ['./ProductView.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,   // This component doesn't has to be checked.
  encapsulation: ViewEncapsulation.Emulated,  
})

export class ProductView implements OnInit {
    product: Product = {} as Product;
    inProgress$: Observable<boolean>;

    constructor(
        private store$: Store<AppState>,
        private router: Router,
        private activatedRoute: ActivatedRoute,
      ) {
          this.activatedRoute.queryParams.subscribe((params: {imdbID: string}) => {
              if(!params.imdbID) return;  
            
              this.store$.select (
                  ProductsSelectors.getAllProducts,
              ).subscribe((products: Array<Product>) => {
                    this.product = products.find((product: Product) => {
                        return product.imdbID == params.imdbID;
                    });
              });  
          })

          this.inProgress$ = this.store$.select (
			ProductsSelectors.getProductsInProgress,
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

    showDefaultImage(img: HTMLImageElement): void{
        img['target'].src = IMAGE_NOT_FOUND_URL;
    }

    navigateBackHome(): void{
        this.router.navigate(['/Home']);
    } 
}
