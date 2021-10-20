import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
    constructor(public firestore: AngularFirestore) {
    // this.orders$ = firestore.collection(environment.ORDERS).ref.where("UserID","==","f1rJZ4HniPdA60gBHZCKyWo0vBw1").valueChanges();
    const user = JSON.parse(localStorage.getItem('user')!);
    console.log("User returned", user.uid)


  }

  getUserOrders(userID:string):Observable<any>{
    return this.firestore.collection(environment.ORDERS, ref => ref.where('UserID', '==', userID)).valueChanges();
  }
}
