import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {  Observable, of } from 'rxjs';
import { Order } from 'src/app/shared/models/order';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {


 saveOrder(order: Order) {
    const docRef=this.firestore.collection(environment.ORDERS).doc();
    order.OrderId=docRef.ref.id;
    docRef.set(order);
    
  }

  constructor(public firestore:AngularFirestore) { }
}
