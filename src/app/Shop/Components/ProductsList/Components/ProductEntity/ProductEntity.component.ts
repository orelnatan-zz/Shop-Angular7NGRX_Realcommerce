import { Component, Input, ViewChild, ElementRef, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Product } from '../../../../Models/Product.model';
import { Update } from '../../../../Models/Update.model';

@Component({
  template: ``,
  encapsulation: ViewEncapsulation.Emulated,
})
// This component is inherited by ProductBox and ProductRow components //
export class ProductEntity {
    @Output() selected: EventEmitter<string> = new EventEmitter();
    @Output() updated: EventEmitter<Update> = new EventEmitter();
    @Input() product: Product;
    @ViewChild('inputReference') inputReference: ElementRef;

    isEditable: boolean;

    handleBlur(event) {
        this.isEditable = false;
        
        const inputValue: string = this.inputReference.nativeElement.value;

        if(inputValue != this.product.Title){   // Trigger request only if value was changed!
            this.updated.emit({
                imdbID: this.product.imdbID,
                newTitle: inputValue,
            })
        }
	}
}
