import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { RoutingModule } from './RoutingModule.module';
import { AppStoreModule as StorModule } from './Store/AppStore.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { Products } from './Shop/Services/Products.service';

import { Selected } from './Core/Components/Header/Directives/Selected/Selected.directive';
import { Tooltip } from './Core/Directives/Tooltip/Tooltip.directive';

import { AppRoot } from './Core/Components/AppRoot/AppRoot.component';
import { Home } from './Shop/Pages/Home';
import { Header } from './Core/Components/Header/Header.component';
import { SearchBox } from './Core/Components/Header/Components/SearchBox';
import { ProductsList } from './Shop/Components/ProductsList';
import { ProductEntity } from './Shop/Components/ProductsList/Components/ProductEntity';
import { ProductBox } from './Shop/Components/ProductsList/Components/ProductEntity/Components/ProductBox';
import { ProductRow } from './Shop/Components/ProductsList/Components/ProductEntity/Components/ProductRow';
import { ProductView } from './Shop/Pages/ProductView';
import { ErrorAlert } from './Frequent/Components/ErrorAlert';
import { Loader } from './Frequent/Components/Loader';
import { PageNotFound } from './Core/Pages/PageNotFound';

@NgModule({
  declarations: [
    AppRoot,
    Home,
    Header,
    SearchBox,
    ProductsList,
    ProductEntity,
    ProductBox,
    ProductRow,
    ProductView,
    ErrorAlert,
    Loader,
    PageNotFound,
    Selected,
    Tooltip
  ],
  imports: [
    BrowserModule,
    HttpModule,
    JsonpModule,
    ReactiveFormsModule,
    FormsModule,
    MomentModule,
    RoutingModule,
    StorModule,
    HttpClientModule,
    StoreDevtoolsModule.instrument({
      maxAge: 10
    })
  ],
  providers: [ Products,  ],
  bootstrap: [ AppRoot ]
})

export class AppModule { }
