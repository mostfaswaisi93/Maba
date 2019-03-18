import { ProductsService } from './services/products.service';
import { Router } from '@angular/router';
import { UserService } from './services/users.service';
import { Component, Input } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'maba';
  constructor(
    private userService: UserService,
    private productsService: ProductsService,
    private router: Router,
    private toastr: ToastrManager
  ) {}

  logOut() {
    this.userService.isLogin = false;
    this.userService.isAdmin = false;
    localStorage.removeItem('token');
    this.toastr.successToastr('Logged out successfully');
    this.router.navigateByUrl('/login');
  }

  goCart() {
    this.router.navigateByUrl('/checkout');
  }
}
