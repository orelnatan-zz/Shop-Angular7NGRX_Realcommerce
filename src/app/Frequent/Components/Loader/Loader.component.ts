import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './Loader.component.html',
  styleUrls: ['./Loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Loader {}
