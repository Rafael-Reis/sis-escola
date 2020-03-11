import { Caixa } from './caixa.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CaixaService {

  constructor(private http: HttpClient) { }

  abrirCaixa(data) {
    return this.http.post(`${environment.apiUrl}/caixas`, data);
  }

  fecharCaixa(data) {
    return this.http.put(`${environment.apiUrl}/caixas`, data);
  }

  getCaixaAberto(): Observable<Caixa> {
    return this.http.get<Caixa>(`${environment.apiUrl}/caixas/aberto`);
  }

  conferir(caixaId: number = null) {
    const url = environment.apiUrl + '/caixas/conferir' + (caixaId !== null ? '/' + caixaId : '');
    return this.http.get(url);
  }

  getPage(currentPage: number) {
    return this.http.get(`${environment.apiUrl}/caixas/page?page=${currentPage}`);
  }



}
