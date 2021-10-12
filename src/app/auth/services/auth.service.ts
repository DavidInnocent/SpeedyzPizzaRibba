import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Auth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  enableLogout$=new BehaviorSubject<boolean>(false)

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigateByUrl('configurator');
        this.enableLogout$.next(false);
        localStorage.setItem('user', JSON.stringify(user));
       
      } else {
        this.router.navigateByUrl('/');
        this.enableLogout$.next(true);
        localStorage.setItem('user', '{}');
      
      }
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return (user === '{}') ? false : true;
  }
  
  SignIn(email:string, password:string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['configurator']);
          this.enableLogout$.next(false);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }


  SignUp(email:string, password:string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {

        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }
 
  SignInWithGoogle(){
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(value=>{
      console.log(value.user);
    })

  }
  SignInWithFacebook(){
    this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(value=>{
      console.log(value.user);
    })

  }

  SetUserData(user:any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
    })
  }
}
