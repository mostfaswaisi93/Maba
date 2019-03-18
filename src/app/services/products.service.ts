import { IUser } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product';

// const url: string = "http://localhost:3000";
const url = 'http://oday9.azurewebsites.net';
// const url: string = "http://localhost:5852";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  countTotal = 0;
  reqHeaderToken;
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.getTotal().subscribe(data => this.countTotal = +data);
    }
    this.reqHeaderToken = new HttpHeaders({
      Authorization: 'bearer ' + token
    });
  }

  gets(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(url + '/api/Products');
  }

  get(id): Observable<IProduct> {
    return this.http.get<IProduct>(`${url}/api/Products/${id}`);
  }

  add(product: IProduct) {
    return this.http.post(`${url}/api/Products`, product);
  }
  edit(product: IProduct) {
    return this.http.put(`${url}/api/Products`, product);
  }

  delete(id) {
    return this.http.delete(`${url}/api/Products/${id}`);
  }

  addToCart(productId) {
    return this.http.post(`${url}/api/Carts`, productId, {
      headers: this.reqHeaderToken
    });
  }

  getCart() {
    return this.http.get(`${url}/api/Carts`, { headers: this.reqHeaderToken });
  }

  getTotal() {
    return this.http.get(`${url}/api/Carts/GetTotal`, { headers: this.reqHeaderToken });
  }
}
