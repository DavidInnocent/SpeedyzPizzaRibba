import { Topping } from "./topping";

export interface Order {
    Toppings:Array<Topping>,
    PizzaType:string,
    DiscountApplied:boolean,
    Quantity:number
}
