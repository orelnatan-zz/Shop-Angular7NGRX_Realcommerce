import { Component } from '@angular/core';
import { ProductEntity } from '../../ProductEntity.component';

@Component({
  selector: 'product-row',
  templateUrl: './ProductRow.component.html',
  styleUrls: ['./ProductRow.component.scss'],
  host: {
    '(document:click)': 'handleBlur($event)',
  },
})

export class ProductRow extends ProductEntity {}
