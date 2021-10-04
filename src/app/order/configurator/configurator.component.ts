import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscountCode } from 'src/app/models/discount-code';
import { Order } from 'src/app/models/order';
import { Pizza } from 'src/app/models/pizza';
import { Topping } from 'src/app/models/topping';
import { ConfiguratorService } from './configurator.service';
import { Router } from '@angular/router';

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
  discountCode = '';
  error = '';
  total = 0;
  discountApplied=0;
  pickedPizzaAmount=0;
  toppingTotal=0;
  selectedTopping!: string;
  selectedToppingIndex!: number;
  
  configuratorService: ConfiguratorService
  router!: Router;

  constructor(configuratorService: ConfiguratorService,router: Router) {
    this.configuratorService=configuratorService;
    this.router=router;
  }

  ngOnInit(): void {
    this.configuratorService.pizzas.subscribe((pizzasReturned: Pizza[]) => this.pizzas = pizzasReturned);
    this.configuratorService.toppings.subscribe((toppingsReturned:Topping[]) => this.toppings = toppingsReturned);
    this.configuratorService.discounts.subscribe((discountsReturned:DiscountCode[]) => this.discounts = discountsReturned);
  }

  continueToShipping() {
    this.pickedOrder = {
      PizzaType: this.pickedPizza,
      Quantity: this.quantity,
      DiscountApplied: this.discountedPizza,
      Toppings: this.pickedToppings
    }
    this.router.navigateByUrl('/order_success');

  }

  setPickedToppings(topping: Topping,selectedIndex:number) {
    let toppingToBeRemoved=this.pickedToppings.filter(toppingInList=>topping.Name===toppingInList.Name)
    
    if(toppingToBeRemoved.length>0)
    {
      delete this.pickedToppings[this.pickedToppings.indexOf(toppingToBeRemoved[0])];
      this.selectedTopping=topping.Name.toLowerCase();
      this.selectedToppingIndex=selectedIndex;
      this.calculateTotal();
      return;
    }
    this.selectedToppingIndex=selectedIndex;
    this.pickedToppings.push(topping);
    this.calculateTotal();
    
  }
  setPickedPizza(pizza: Pizza) {
    this.pickedPizza = pizza;
    this.pickedPizzaAmount=pizza.Price
    this.calculateTotal();
  }
  applyDiscount() {

    const discountToBeApplied = this.discounts.filter(discount => discount.Name.toLowerCase() === this.discountCode.toLowerCase());
    if (discountToBeApplied.length == 0) {
      this.error = "Discount code is invalid";
      return;
    }
    this.discountApplied=discountToBeApplied[0].Amount;
    console.log(this.discountApplied)
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

}
