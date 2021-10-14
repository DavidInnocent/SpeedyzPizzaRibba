import { Pizza } from "./pizza";
import { ShippingDetails } from "./shipping-details";
import { Topping } from "./topping";

export interface Order {
    Toppings:Array<Topping>,
    PizzaType:Pizza,
    DiscountApplied:number,
    Quantity:number,
    Total:number,
    Shipping:ShippingDetails,
    OrderId:string,
    Status:string,
    DateOfOrder:Date
}
