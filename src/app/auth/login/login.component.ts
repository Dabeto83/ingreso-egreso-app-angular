import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'

import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import * as uiActions from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  loginForm: FormGroup;
  loading: boolean = false;
  uiSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
      console.log("cargando subs");
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  iniciarSesion() {
    const { email, password } = this.loginForm.value;

    this.store.dispatch(uiActions.isLoading())

    this.authService.iniciarSesion(email, password)
      .then(result => {
        this.store.dispatch(uiActions.stopLoading());
        this.router.navigate(['/']);
      })
      .catch(error => {
        this.store.dispatch(uiActions.stopLoading());
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      })

  }

}
