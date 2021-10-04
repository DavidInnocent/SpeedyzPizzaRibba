import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private order!:Order
  constructor() { }
  getOrder():Order{
    return this.order;
  }

  setOrder(order:Order){
    this.order=order;
  }
}
