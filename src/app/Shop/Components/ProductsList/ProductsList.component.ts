import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../Models/Product.model';
import { Update } from '../../Models/Update.model';

@Component({
  selector: 'products-list',
  templateUrl: './ProductsList.component.html',
  styleUrls: ['./ProductsList.component.scss']
})

export class ProductsList {
    @Input() products: Array<Product>;
    @Input() viewMode: string;
    @Output() onSelect: EventEmitter<string> = new EventEmitter();
    @Output() onUpdate: EventEmitter<Update> = new EventEmitter();
}
