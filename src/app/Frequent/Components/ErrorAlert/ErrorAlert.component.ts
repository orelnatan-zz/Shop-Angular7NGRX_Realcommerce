import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'error-alert',
  templateUrl: './ErrorAlert.component.html',
  styleUrls: ['./ErrorAlert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ErrorAlert {}
