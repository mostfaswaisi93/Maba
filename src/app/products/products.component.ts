import { UserService } from './../services/users.service';
import { Component, OnInit, Output } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductsService } from '../services/products.service';
import { IProduct } from '../models/product';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: IProduct[];
  constructor(
    private productsService: ProductsService,
    private userService: UserService,
    private toastr: ToastrManager,
    private router: Router
  ) {}

  ngOnInit() {
    this.productsService
      .gets()
      .subscribe(products => this.products = products);
  }

  goProduct(id) {
    this.router.navigate(['product', id]);
  }

  addToCart(id) {
    if (!this.userService.isLogin) {
      this.toastr.errorToastr('You must be logged in first');
      this.router.navigateByUrl('/login');
    } else {

      this.productsService.addToCart(id).subscribe(
        data => {
          this.productsService.countTotal = +data;
        },
        errors => {
          console.log(errors);
        }
      );
    }
  }
}
