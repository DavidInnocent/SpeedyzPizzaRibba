import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  shippingForm = new FormGroup({
    country: new FormControl(''),
    postalCode: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
  });
  dataService: DataSharingService;
  order!: Order
  orderToppings!:string;
  discountCode!:string;
  router: Router;
  constructor(dataService: DataSharingService,router:Router) {
    this.dataService = dataService;
    this.router=router;
  }

  ngOnInit(): void {
    this.order = this.dataService.getOrder();
    this.orderToppings=this.order.Toppings.map(topping=>topping.Name).join();
  }
  applyDiscount() {

    // const discountToBeApplied = this.discounts.filter(discount => discount.Name.toLowerCase() === this.discountCode.toLowerCase());
    // if (discountToBeApplied.length == 0) {
    //   this.error = "Discount code is invalid";
    //   return;
    // }
    // this.discountApplied=discountToBeApplied[0].Amount;
    // this.dataSharingService.setDiscount(true)
    // this.calculateTotal();
  }
  finishOrderingPizza(){
    console.log(this.shippingForm.value)
    this.router.navigateByUrl('/order_success');
  }

}