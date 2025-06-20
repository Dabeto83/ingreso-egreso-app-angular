import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user, UserCredential } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { AppState } from '../app.reducers';
import { Store } from '@ngrx/store';
import * as userActions from '../auth/user.actions';
import { getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    authState(this.auth).subscribe(authUser => {
      if (authUser) {
        getDoc(doc(this.firestore, `usuarios/${authUser.uid}`))
          .then(user => {
            let userDb = user.data();
            const newUser = new User(
              userDb?.['uid'],
              userDb?.['nombre'],
              userDb?.['email']
            );
            this.store.dispatch(userActions.setUser({ user: newUser }));
          })
          .catch(error => {
            this.store.dispatch(userActions.unsetUser());
          })
      }
      else {
        this.store.dispatch(userActions.unsetUser());
      }
    });
  }

  iniciarSesion(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  crearUsuario(nombre: string, email: string, password: string): Promise<void | UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(({ user }) => {
        const newUser = new User(user.uid, nombre, user.email!);
        return setDoc(doc(this.firestore, `usuarios/${user.uid}`), { ...newUser });
      });
  }

  cerrarSesion(): Promise<void> {
    return signOut(this.auth)
  }

  isAuth() {
    return authState(this.auth).pipe(
      map(user => user != null)
    );
  }

}
