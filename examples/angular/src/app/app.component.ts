import { Component } from '@angular/core';
import { HeaderPage } from './(shared)/header/header';
import { ProductDetailPage } from './(modules)/product-detail/product-detail.page';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderPage, ProductDetailPage],
  templateUrl: './app.component.html',
})
export class AppComponent {}
