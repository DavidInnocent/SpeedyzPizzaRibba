import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {
  toppings: Observable<any[]>;
  pizzas: Observable<any[]>;
  discounts: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.toppings = firestore.collection('Toppings').valueChanges();
    this.pizzas = firestore.collection('Pizzas').valueChanges();
    this.discounts = firestore.collection('DiscountCodes').valueChanges();
  }
}
