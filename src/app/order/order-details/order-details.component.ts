import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  validation_messages = {
    'address': [
      { type: 'required', message: 'Address is required' },
      { type: 'minlength', message: 'Address must be at least 5 characters long' }
    ],
    'country': [
      { type: 'required', message: 'Country is required' },
      { type: 'minlength', message: 'Country must be at least 2 characters long' }
    ],
    'city': [
      { type: 'required', message: 'City is required' },
      { type: 'minlength', message: 'CIty must be at least 2 characters long' }
    ],
    'postalCode': [
      { type: 'required', message: 'Postal Code is required' },
      { type: 'minlength', message: 'Postal Code must be at least 2 characters long' }
    ]}

  shippingForm = new FormGroup({
    country: new FormControl('',[Validators.required,Validators.minLength(2)]),
    postalCode: new FormControl('',[Validators.required,Validators.minLength(2)]),
    address: new FormControl('',[Validators.required,Validators.minLength(5)]),
    city: new FormControl('',[Validators.required,Validators.minLength(2)]),
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
    this.router.navigateByUrl('/order_success');
  }

}