import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient :HttpClient ) { };

  checkoutPayment(id:string, data:object):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      {
        "shippingAddress": data
      }
     )
  }

  cashOrder(id:string, data:object):Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/orders/${id}`,
      {
        "shippingAddress": data
      }
     )
  }

  getUserOrders(id:string):Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`
     )
  }
}