import { IUser } from './../models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: IUser[];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.get().subscribe(data => {
      this.users = data;
    });
  }
}
