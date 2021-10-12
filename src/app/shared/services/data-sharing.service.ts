import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DiscountCode } from 'src/app/models/discount-code';
import { Order } from 'src/app/models/order';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private order!:Order
  private discountAdded=false;
  private discounts=new Array<DiscountCode>();
  disounts$!:Observable<any[]>;
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
