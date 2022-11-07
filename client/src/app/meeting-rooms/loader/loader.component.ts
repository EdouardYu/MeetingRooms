import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-loader',
  template: `
    <h2 *ngIf="!error">
      Chargement, veuillez patienter ...
    </h2>
    <h2 *ngIf="error">
      Oups! Une erreur est survenue de notre côté Veuillez réessayer plus tard
    </h2>
  `,
  styles: ['h2 {font-size: 24px; cursor: default; margin: 32px 0; text-align: center;}']
})
export class LoaderComponent implements OnInit {
  error: boolean = false;
  
  ngOnInit(): void {
    timer(1).subscribe((): void => {
      this.error = true;
    })
  }
}
