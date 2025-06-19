import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, user, UserCredential } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) { }

  initAuthListener() {
    authState(this.auth).subscribe(user => {
      console.log(user);
      console.log(user?.email);
      console.log(user?.uid);
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
