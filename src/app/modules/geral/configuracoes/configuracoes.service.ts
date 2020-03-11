import { Configuracoes } from './configuracoes.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracoesService {

  constructor(private http: HttpClient) { }


  update(config: Configuracoes) {
    return this.http.put(`${environment.apiUrl}/configuracoes`, config);
  }

  getConfiguracoes() {
    return this.http.get(`${environment.apiUrl}/configuracoes`);
  }

  getParametros() {
    return this.http.get(`${environment.apiUrl}/configuracoes/parametros`);
  }




}
