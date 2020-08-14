import { Component } from '@angular/core';

@Component({
  selector: 'not-found-app',
  template: `<h1 class="text-decor">404</h1>
    <h2 class="text-decor">Page Not Found</h2>`,
  styles: ['* { text-align:center; }'],
})
export class NotFoundComponent {}
