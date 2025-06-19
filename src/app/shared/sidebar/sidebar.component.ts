import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private authService: AuthService,
    private router: Router
  ) {

  }

  cerrarSesion() {
    this.authService.cerrarSesion()
      .then(res => { this.router.navigate(['/login']) })
      .catch(error => {
        console.error(error);
      })
  }
}
