import { Component, ChangeDetectorRef, AfterViewChecked, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProductsSelectors } from '../../../Store';

import { AppState } from '../../../Store/AppState.model';

@Component({
  selector: 'app-root',
  templateUrl: './AppRoot.component.html',
  styleUrls: ['./AppRoot.component.scss'],
  encapsulation: ViewEncapsulation.Emulated, // Encapsulating styles ...
})
// Top Level Component //
export class AppRoot implements AfterViewChecked {
    inProgress$: Observable<boolean>;
    failure$: Observable<boolean>;

    constructor(
        private store$: Store<AppState>,
        private changeDetectorRef: ChangeDetectorRef
    ){
        this.failure$ = this.store$.select (
			ProductsSelectors.getProductsFailure,
        );

        this.inProgress$ = this.store$.select (
			ProductsSelectors.getProductsInProgress,
        );
    }

    ngAfterViewChecked(): void {
        this.changeDetectorRef.detectChanges();
    }
}
