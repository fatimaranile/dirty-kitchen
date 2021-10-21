import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { IUser } from '../shared/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData: firebase.User;

  constructor(
    public fireStore: AngularFirestore,
    public fireAuth: AngularFireAuth,
  ) {

    this.fireAuth.authState.subscribe(user => {
      if(user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  loginUser(): firebase.User {
    return this.userData;
  }

  signInWithEmailPassword(email, password) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  getRegistrationToken(user: IUser) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  registerUserData(user: IUser) {
    const userReference: AngularFirestoreDocument <any> = this.fireStore.doc(`users/${user.uid}`);
    const userData: IUser = {
      uid: user.uid,
      name: user.name,
      email: user.email,
      password: user.password,
    };

    console.log(`userRef: ${userReference}`);

    return userReference.set(userData, {
      merge: true
    });
  }
}
