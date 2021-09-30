import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguratorService } from './configurator.service';

interface Pizza{
  Name: string,
  Price: number
}interface Topping{
  Name: string,
  Price: number
}interface Discount{
  Name: string,
  Amount: number
}
@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit {

  pizzas:Array<Pizza>;
  toppings:Array<Topping>;
  discounts:Array<Discount>;
  constructor(configurator:ConfiguratorService) {
    configurator.pizzas.subscribe(pizzasReturned=>this.pizzas=pizzasReturned);
    configurator.toppings.subscribe(toppingsReturned=>this.toppings=toppingsReturned);
    configurator.discounts.subscribe(discountsReturned=>this.discounts=discountsReturned);    
   }

  ngOnInit(): void {
    }

}
