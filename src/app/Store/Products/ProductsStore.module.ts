import { CommonModule, AsyncPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductsReducer } from './Reducer';
import { ProductsEffects } from './Effects';
import { DatePipe } from '@angular/common';

@NgModule({
    imports: [
      CommonModule,
      StoreModule.forFeature('Products', ProductsReducer),
      EffectsModule.forFeature([ ProductsEffects ]),
    ],
    providers: [ ProductsEffects, DatePipe ]
})
export class ProductsStoreModule {

}
