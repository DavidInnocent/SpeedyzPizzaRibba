import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguratorService {
  toppings: Observable<any[]>;
  pizzas: Observable<any[]>;
  discounts: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.toppings = firestore.collection(environment.TOPPINGS).valueChanges();
    this.pizzas = firestore.collection(environment.PIZZAS).valueChanges();
    this.discounts = firestore.collection(environment.DISCOUNTS).valueChanges();
  }
}
