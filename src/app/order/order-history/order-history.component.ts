import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order';

import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { OrderHistoryService } from './order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit, OnDestroy {

  orderDetails=new Observable<Order[]>();
  loadingSpinner=true;
  orderDetailsSubscription!: Subscription;


  constructor(public orderService:OrderHistoryService,public dataSharingService:DataSharingService,public router:Router) { }
  ngOnDestroy(): void {
    if(this.orderDetailsSubscription)this.orderDetailsSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.orderDetails=this.orderService.orders$
    this.orderDetailsSubscription=this.orderDetails.subscribe(()=>this.loadingSpinner=false);
  }
  ReOrder(order:Order){
    order.DiscountApplied=0;
    this.dataSharingService.setOrder(order);
    this.router.navigateByUrl('order_details');
  }
  

}
