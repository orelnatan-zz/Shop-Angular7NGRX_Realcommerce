import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './Shop/Pages/Home';
import { ProductView } from './Shop/Pages/ProductView';
import { PageNotFound } from './Core/Pages/PageNotFound';

const routes: Routes = [
    { path: '', redirectTo: 'Home', pathMatch: 'full' },
    { path: 'Home', component: Home },
    { path: 'Product-view', component: ProductView },

    { path: '**', component: PageNotFound },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
  
export class RoutingModule {}