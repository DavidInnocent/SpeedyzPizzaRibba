import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscountCode } from 'src/app/models/discount-code';
import { Pizza } from 'src/app/models/pizza';
import { Topping } from 'src/app/models/topping';
import { ConfiguratorService } from './configurator.service';

@Component({
  selector: 'app-configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.scss']
})
export class ConfiguratorComponent implements OnInit {

  pizzas:Array<Pizza>;
  toppings:Array<Topping>;
  discounts:Array<DiscountCode>;
  constructor(configurator:ConfiguratorService) {
    configurator.pizzas.subscribe(pizzasReturned=>this.pizzas=pizzasReturned);
    configurator.toppings.subscribe(toppingsReturned=>this.toppings=toppingsReturned);
    configurator.discounts.subscribe(discountsReturned=>this.discounts=discountsReturned);    
   }

  ngOnInit(): void {
    }

}
