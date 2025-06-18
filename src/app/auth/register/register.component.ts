import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registroForm = this.formBuilder.group(
      {
        nombre: ['', Validators.required],
        correo: ['', Validators.required, Validators.email],
        password: ['', Validators.required]
      });
  }

  ngOnInit() {

  }
  crearUsuario(){
    console.log(this.registroForm);
    console.log(this.registroForm.valid);
    console.log(this.registroForm.value);
  }
}
