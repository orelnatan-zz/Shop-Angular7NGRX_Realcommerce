import { HttpClient, HttpParams, } from '@angular/common/http';
import { Injectable, }  from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, of as observableOf } from 'rxjs';  
import { map, catchError, delay } from 'rxjs/operators';
import { throwError, } from 'rxjs';
import { Product } from '../Models/Product.model';
import { ProductsResponse } from '../Models/ProductsResponse.model';
import { Update } from '../Models/Update.model';

@Injectable()
export class Products {
    products: Array<Product>;

    constructor(
		private httpClient: HttpClient
    ){}
    
    public getAllProducts(): Observable<Product[] | Error> {
		return this.products ? observableOf(this.products) : this.httpClient.get(environment.apis.products.getAllProducts)
			.pipe(delay(3000),          // The "delay(3000)" is just for illustration of a long pending, we don't really need it!.
				map((response: ProductsResponse): Product[] => {
                    this.products = response.results;
                    return this.products;    
				}), catchError((error) => {      
                    return throwError(error);  
				})
			)
    }
    // This function simulates a real Ajax GET request, which tells the server to change a product title adjusted to "imdbID".
    public updateProductTitle(update: Update): Observable<number> {
        let params: HttpParams = new HttpParams();              // Set request parameters
        params = params.append('imdbID', update.imdbID);
        params = params.append('newTitle', update.newTitle);

        return this.httpClient.get(environment.apis.products.getAllProducts, { params: params })
			.pipe(delay(1000),          // The "delay(1000)" is just for illustration of a long pending, we don't really need it!.
				map((): number => {    
                    return 200;                     // It should return status 200 for success
				}), catchError((error) => {      
                    return throwError(error);        // In case request fails, throw error;
				})
			)
    }

    public resetProducts(): void {
        this.products = null;
    }
}
