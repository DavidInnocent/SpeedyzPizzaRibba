import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DiscountCode } from 'src/app/shared/models/discount-code';
import { Order } from 'src/app/shared/models/order';

import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { OrderDetailService } from './order-detail.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  orderPlaced!:Order
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
  
  discounts=new Array<DiscountCode>();
  order!: Order
  orderToppings!:string;
  discountCode='';
  disableDiscount=false;
  total!: number;
  discountText='Discount code'
  discountSubscription!: Subscription;
  constructor(public dataService: DataSharingService,public router:Router,public orderService:OrderDetailService,public toastr: ToastrService) {
  }
  ngOnDestroy(): void {
    if(this.discountSubscription)this.discountSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.order = this.dataService.getOrder();
    this.total=this.order.Total;
    this.discountSubscription=this.dataService.disounts$.subscribe(discounts=>this.discounts=discounts);
    this.orderToppings=this.order.Toppings.map(topping=>topping.Name).join();
    if(this.order.DiscountApplied!==0){
      this.disableDiscount=true;
      this.discountText='Discount applied'
      return
    }
  }
  applyDiscount() {

    console.log(this.discounts);
    const discountToBeApplied = this.discounts.filter(discount => discount.Name.toLowerCase() === this.discountCode.toLowerCase());
    if (discountToBeApplied.length == 0) {
      console.log("Discount not valid")
      return;
    }
    this.disableDiscount=true
    this.discountText='Discount applied'
    const discount=discountToBeApplied[0].Amount;
    this.order.DiscountApplied=discount;
    this.total-=discount;

    
  }
  finishOrderingPizza(){
    if(!this.shippingForm.valid)
    {
      this.showError('All shipping fields have to be filled to continue.')
      return
    }
   this.order.Total=this.total;
    this.order.Shipping={
      StreetNameAndNumber:this.shippingForm.controls['address'].value,
      City:this.shippingForm.controls['city'].value,
      PostalCode:this.shippingForm.controls['postalCode'].value,
      Country:this.shippingForm.controls['country'].value
    }
    this.orderService.saveOrder(this.order);
    this.toastr.success( 'Your order sent successfully','Error Encountered');
    this.router.navigateByUrl('/order_success');
  }

  
  
  showError(value:string) {
    this.toastr.error( value,'Error Encountered');
  }


}