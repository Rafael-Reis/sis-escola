import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { User } from './user.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  create(usuario: User) {
    return this.http.post(`${environment.apiUrl}/users`, usuario);
  }

  update(usuario: User) {
    return this.http.put(`${environment.apiUrl}/users`, usuario);
  }

  get(usuario: User) : Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users`, usuario);
  }

  search(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users/search/${query}`);
  }

  getPage(current: number) {
    return this.http.get(`${environment.apiUrl}/users/page/${current}`);
  }

  isAdmin(username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/users/admin`, {username: username, password: password});
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }
}
