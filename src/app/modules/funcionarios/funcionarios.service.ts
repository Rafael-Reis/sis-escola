import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Funcao, Funcionario, FuncionarioPage } from './funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {

  constructor(private http: HttpClient) { }

  create(data) {
    return this.http.post(`${environment.apiUrl}/funcionarios`, data);
  }

  update(data) {
    return this.http.put(`${environment.apiUrl}/funcionarios`, data);
  }

  search(query: string): Observable<Funcionario[]>{
    return this.http.get<Funcionario[]>(`${environment.apiUrl}/funcionarios/search/${query}`);
  }

  getId(id: number): Observable<Funcionario>{
    return this.http.get<Funcionario>(`${environment.apiUrl}/funcionarios/${id}`);
  }

  getPage(current: number): Observable<FuncionarioPage>{
    return this.http.get<FuncionarioPage>(`${environment.apiUrl}/funcionarios/page/${current}`);
  }

  delete(id: number) {
    return this.http.delete<Funcionario>(`${environment.apiUrl}/funcionarios/${id}`);
  }

  getFuncoes(): Observable<Funcao[]> {
    return this.http.get<Funcao[]>(`${environment.apiUrl}/funcionarios/funcoes`);
  }
}
