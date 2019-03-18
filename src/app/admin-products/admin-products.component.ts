import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { IProduct } from '../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: IProduct[];
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productsService
      .gets()
      .subscribe(products => (this.products = products));
  }

  goAdd() {
    this.router.navigate(['addProduct']);
  }

  goEdit(id) {
    this.router.navigate(['editProduct', id]);
  }

  delete(id) {
    this.productsService.delete(id).subscribe(data => {
      if (data) {
        this.productsService.gets().subscribe(dd => (this.products = dd));
      }
    });
  }
}
