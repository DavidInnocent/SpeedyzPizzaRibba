import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  enableLogout$ = new BehaviorSubject<boolean>(false);
  error$ = new Subject<string>();
  loggedInUser$ = new Subject<any>();
  username = ''

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

        if (user.displayName === null&&this.username!==null) {
          user.updateProfile(
            {
              displayName: this.username
            }).then(() => {

              this.finishAuth(user)

            })
        }
        else{
          this.finishAuth(user)
        }
        

      }
      else {
      
        
        this.enableLogout$.next(true);


      }
    })
  }

  finishAuth(user: any) {
    this.SetUserData(user);
    this.router.navigateByUrl('configurator');
    this.enableLogout$.next(false);
    this.loggedInUser$.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }
  get isLoggedIn(): boolean {
    const user = localStorage.getItem('user')!;
    return (user ==='{}') ? false : true;
  }

  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['configurator']);
          this.enableLogout$.next(false);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        this.error$.next(error.message)
      })
  }


  SignUp(email: string, password: string, username: string) {
    this.username = username;
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {

        return

      }).catch((error) => {
        this.error$.next(error.message)
      })
  }

  SignInWithGoogle() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(error=>this.error$.next(error.message));
  }
  SignInWithFacebook() {
    this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).catch(error=>this.error$.next(error.message));
  }

  SetUserData(user: any) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`${environment.USERS}/${user.uid}`);
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
      this.router.navigate(['log_in'])
    })
  }
}
