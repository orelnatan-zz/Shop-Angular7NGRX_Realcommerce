import { Component, ViewChild, ElementRef } from '@angular/core';
import { ProductEntity } from '../../ProductEntity.component';

@Component({
  selector: 'product-box',
  templateUrl: './ProductBox.component.html',
  styleUrls: ['./ProductBox.component.scss'],
  host: {
    '(document:click)': 'handleBlur($event)',
  },
})

export class ProductBox extends ProductEntity {}
