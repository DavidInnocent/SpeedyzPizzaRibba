import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DiscountCode } from 'src/app/shared/models/discount-code';

import { ConfiguratorService } from './configurator.service';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { Order } from 'src/app/shared/models/order';
import { Pizza } from 'src/app/shared/models/pizza';
import { ShippingDetails } from 'src/app/shared/models/shipping-details';
import { Topping } from 'src/app/shared/models/topping';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit, OnDestroy {


  discounts = new Array<DiscountCode>();
  loadingSpinner=true;

  pizzasObservable = new Observable<Pizza[]>();
  toppingsObservable = new Observable<Topping[]>();
  discountsObservable = new Observable<DiscountCode[]>();

  toppingsSubcription!:Subscription  
  discountsSubcription!:Subscription

  pickedToppings = new Array<Topping>();
  pickedPizza!: Pizza;
  quantity = 1;
  discountedPizza = false;
  disableDiscount=false;
  pickedOrder!: Order;
  discountCode='';
  error!:string;
  total = 0;
  discountApplied=0;
  pickedPizzaAmount=0;
  toppingTotal=0;
  selectedTopping!: string;
  selectedToppingIndex!: number;
  userId!:any;
  
  configuratorService: ConfiguratorService
  router!: Router;
  dataSharingService: DataSharingService;
  selectedPizza!: Pizza;

  constructor(configuratorService: ConfiguratorService,router: Router,dataSharingService:DataSharingService,public toastr: ToastrService) {
    this.configuratorService=configuratorService;
    this.router=router;
    this.dataSharingService=dataSharingService;
    this.userId =JSON.parse(localStorage.getItem('user')!).uid;
  }
  ngOnDestroy(): void {
    if(this.toppingsSubcription)this.toppingsSubcription.unsubscribe();
    if(this.discountsSubcription)this.discountsSubcription.unsubscribe();
  }

  ngOnInit(): void {
    this.pizzasObservable=this.configuratorService.pizzas;
    this.toppingsObservable=this.configuratorService.toppings;
    this.discountsObservable=this.configuratorService.discounts;
    this.toppingsSubcription=this.configuratorService.toppings.subscribe(()=>this.loadingSpinner=false)
    this.discountsSubcription=this.discountsObservable.subscribe((discountsReturned:DiscountCode[]) => this.discounts = discountsReturned);
    this.dataSharingService.disounts$=this.discountsObservable;
  }


  setPickedToppings(topping: Topping) {
    let toppingToBeRemoved=this.pickedToppings.filter(toppingInList=>topping.Name===toppingInList.Name)
    
    if(toppingToBeRemoved.length>0)
    {
      delete this.pickedToppings[this.pickedToppings.indexOf(toppingToBeRemoved[0])];
      this.selectedTopping=topping.Name.toLowerCase();
     
      this.calculateTotal();
      return;
    }
   
    this.pickedToppings.push(topping);
    this.calculateTotal();
    
  }
  setPickedPizza(pizza: Pizza) {
    this.pickedPizza = pizza;
    this.pickedPizzaAmount=pizza.Price
    this.selectedPizza=pizza
    this.calculateTotal();
  }
  applyDiscount() {

    const discountToBeApplied = this.discounts.filter(discount => discount.Name.toLowerCase() === this.discountCode.toLowerCase());
    if (discountToBeApplied.length == 0) {
      this.error = "Discount code is invalid";
      return;
    }
    this.disableDiscount=true;
    this.discountCode='Discount applied'
    this.discountApplied=discountToBeApplied[0].Amount;
    this.discountedPizza=true;
    this.calculateTotal();
  }

  calculateTotal()
  {
    let totalForToppings=0;
    this.pickedToppings.forEach(topping=>totalForToppings+=+topping.Price)
    this.toppingTotal=totalForToppings;

    let totalBeforeDiscount=totalForToppings+this.pickedPizzaAmount;
    this.total=totalBeforeDiscount-this.discountApplied;
    this.total*=this.quantity;
    

  }
  onSearchChange($event:any){
    this.calculateTotal();
  }

  
  continueToShipping() {


    if(this.selectedPizza==null){

      return this.showError("You must select a pizza to continue")
    }
    this.pickedOrder = {
      PizzaType: this.pickedPizza,
      Quantity: this.quantity,
      DiscountApplied: this.discountApplied,
      Toppings: this.pickedToppings,
      Total:this.total,
      Shipping:<ShippingDetails>{},
      OrderId:'',
      Status:'In Progress',
      DateOfOrder:new Date(),
      UserID:this.userId
    }
    this.dataSharingService.setOrder(this.pickedOrder);
    this.router.navigateByUrl('/order_details');

  }

  
  
  showError(value:string) {
    this.toastr.error( value,'Error Encountered');
  }

}
