import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscountCode } from 'src/app/models/discount-code';
import { Order } from 'src/app/models/order';
import { Pizza } from 'src/app/models/pizza';
import { Topping } from 'src/app/models/topping';
import { ConfiguratorService } from './configurator.service';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit {


  pizzas = new Array<Pizza>();
  toppings = new Array<Topping>();
  discounts = new Array<DiscountCode>();

  pickedToppings = new Array<Topping>();
  pickedPizza!: Pizza;
  quantity = 1;
  discountedPizza = false;

  pickedOrder!: Order;
  discountCode!:string;
  error!:string;
  total = 0;
  discountApplied=0;
  pickedPizzaAmount=0;
  toppingTotal=0;
  selectedTopping!: string;
  selectedToppingIndex!: number;
  
  configuratorService: ConfiguratorService
  router!: Router;
  dataSharingService: DataSharingService;
  selectedPizzaIndex!: number;

  constructor(configuratorService: ConfiguratorService,router: Router,dataSharingService:DataSharingService) {
    this.configuratorService=configuratorService;
    this.router=router;
    this.dataSharingService=dataSharingService;
  }

  ngOnInit(): void {
    this.configuratorService.pizzas.subscribe((pizzasReturned: Pizza[]) => this.pizzas = pizzasReturned);
    this.configuratorService.toppings.subscribe((toppingsReturned:Topping[]) => this.toppings = toppingsReturned);
    this.configuratorService.discounts.subscribe((discountsReturned:DiscountCode[]) => this.discounts = discountsReturned);
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
  setPickedPizza(pizza: Pizza,selectedPizzaIndex:number) {
    this.pickedPizza = pizza;
    this.pickedPizzaAmount=pizza.Price
    this.selectedPizzaIndex=selectedPizzaIndex
    this.calculateTotal();
  }
  applyDiscount() {

    const discountToBeApplied = this.discounts.filter(discount => discount.Name.toLowerCase() === this.discountCode.toLowerCase());
    if (discountToBeApplied.length == 0) {
      this.error = "Discount code is invalid";
      return;
    }
    this.discountApplied=discountToBeApplied[0].Amount;
    this.dataSharingService.setDiscount(true)
    this.calculateTotal();
  }

  calculateTotal()
  {
    let totalForToppings=0;
    this.pickedToppings.forEach(topping=>totalForToppings+=+topping.Price)
    let totalBeforeDiscount=totalForToppings+this.pickedPizzaAmount;
    let discount=(this.discountApplied/1000)*totalBeforeDiscount;
    this.total=totalBeforeDiscount-discount;
    this.total*=this.quantity;
    this.toppingTotal=totalForToppings;

  }
  onSearchChange($event:any){
    this.calculateTotal();
  }

  
  continueToShipping() {
    this.pickedOrder = {
      PizzaType: this.pickedPizza,
      Quantity: this.quantity,
      DiscountApplied: this.discountedPizza,
      Toppings: this.pickedToppings,
      Total:this.total
    }
    this.dataSharingService.setOrder(this.pickedOrder);
    this.router.navigateByUrl('/order_details');

  }

}
