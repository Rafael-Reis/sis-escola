import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, AccessToken} from './../modules/usuarios/user.model';

export interface Credenciais {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  key = 'sisesc';
  user: User;

  constructor(private http: HttpClient, private router: Router) {
    this.user = JSON.parse(localStorage.getItem(this.key));
  }



  /**
   * Faz o Login e salvo dados do user no storage
   * @param credenciais
   */
  login(username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/login`, {username: username, password:password}).pipe(
      map((user: User) => {
        this.user = user;
        localStorage.setItem(this.key, JSON.stringify(user));
      }
    ));
  }

  logout() {
    this.http.get(`${environment.apiUrl}/auth/logout`).subscribe(() => {
      this.user = null;
      localStorage.removeItem(this.key);
      this.redirectLoginPage();
      console.log('logout!');
    });
  }

  getUserLogged() {
    return this.http.get(`${environment.apiUrl}/auth/user`).pipe( map((user: User) => this.user = user ) );
  }

  refreshToken(): Observable<boolean> {
    return this.http.get(`${environment.apiUrl}/login/refresh`)
    .pipe(map((user: User) => {

      if(!user) {
        return false;
      }

      this.user = user;
      localStorage.setItem(this.key, JSON.stringify(user));

      return true;

    }));
  }

  getToken() {
    return this.user.token.access_token;
  }

  isLogged() {
    return this.user ? true : false;
  }

  redirectLoginPage(path?: string){
    if(path) {
      this.router.navigate(['/login', path]);
    }

    this.router.navigate(['/login']);
  }

  redirectHomePage(){
    this.router.navigate(['/painel']);
  }

}
