import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart;
  countTotal;
  totalPrice;
  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getCart().subscribe(data => {
      this.cart = data['cart'];
      this.countTotal = data['countTotal'];
      this.totalPrice = data['totalPrice'];
    });
  }
}
