import { Pizza } from "./pizza";
import { Topping } from "./topping";

export interface Order {
    Toppings:Array<Topping>,
    PizzaType:Pizza,
    DiscountApplied:boolean,
    Quantity:number,
    Total:number
}
