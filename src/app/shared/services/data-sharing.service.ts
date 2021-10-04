import { Injectable } from '@angular/core';
import { Order } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private order!:Order
  private discountAdded=false;
  constructor() { }
  getOrder():Order{
    return this.order;
  }

  setOrder(order:Order){
    this.order=order;
  }
  getDiscount():boolean{
    return this.discountAdded;
  }

  setDiscount(discountValue:boolean){
    this.discountAdded=discountValue;
  }
}
