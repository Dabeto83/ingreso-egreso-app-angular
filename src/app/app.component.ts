import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ingreso-egreso-app-redux';

  constructor(private authService: AuthService) {
    this.authService.initAuthListener();
  }
}
