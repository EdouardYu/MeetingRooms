import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-loader',
  template: `
  <h2 *ngIf="!error">
    Chargement, veuillez patienter...
  </h2>
  <h2 *ngIf="error">
    {{message}}
  </h2>
  `,
  styles: ['h2 {font-size: 24px; cursor: default; margin: 32px 0; text-align: center;}']
})
export class LoaderComponent implements OnInit { 
  @Input() message: string;
  error: boolean = false;

  ngOnInit(): void {
    timer(5000).subscribe((): void => {
      this.error = true;
    })
  }
}
