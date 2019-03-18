import { IUser } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrManager
  ) {}

  loginForm: FormGroup;
  email: FormControl = new FormControl('', Validators.required);
  password: FormControl = new FormControl('', Validators.required);

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  login() {
    this.userService.login2(this.loginForm.value).subscribe(
      data => {
        if (data['access_token']) {
          localStorage.setItem('token', data['access_token']);
          this.userService.isLogin = true;
          if (data['roles'].includes('Admin')) {
            this.userService.isAdmin = true;
            this.toastr.successToastr('Logged in successfully');
            this.router.navigateByUrl('/adminProducts');
          } else {
            this.toastr.successToastr('Logged in successfully');
            this.router.navigateByUrl('/products');
          }
        }
      },
      error => {
        this.userService.isLogin = false;
        this.toastr.errorToastr('Incorrect email or password');
      }
    );
  }
}
