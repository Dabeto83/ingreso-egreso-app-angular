import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';
import { AppState } from '../../app.reducers';
import { Store } from '@ngrx/store';
import * as uiActions from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm: FormGroup;
  loading: boolean = false;
  uiSubscriptions: Subscription;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>) {
    this.registroForm = this.formBuilder.group(
      {
        nombre: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });

    this.uiSubscriptions = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
      console.log("cargando subs");
    });
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.uiSubscriptions.unsubscribe();
  }

  crearUsuario() {
    if (this.registroForm.invalid) {
      return;
    }

    this.store.dispatch(uiActions.isLoading());

    const { nombre, email, password } = this.registroForm.value;
    this.authService.crearUsuario(nombre, email, password)
      .then(credenciales => {
        this.store.dispatch(uiActions.stopLoading());
        this.router.navigateByUrl('/dashboard');
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
