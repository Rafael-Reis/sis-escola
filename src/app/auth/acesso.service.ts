import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  constructor(private authService: AuthService) { }

  isPermitido(): boolean {
    return this.authService.user.nivel === 'administrador';
  }

  isNegado(): boolean {
    return this.authService.user.nivel !== 'administrador';
  }

  isAdmin() {
    return this.authService.user.nivel === 'administrador';
  }

  isOperador() {
    return this.authService.user.nivel === 'operador';
  }


}
