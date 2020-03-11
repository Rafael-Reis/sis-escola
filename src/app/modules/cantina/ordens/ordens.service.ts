import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { Produto } from '../produtos/produto.model';
import { Ordem } from './ordem.model';
import { CestaService } from '../cesta/cesta.service';
import { CestaItem } from '../cesta/cesta.model';

@Injectable({
  providedIn: 'root'
})
export class OrdensService {
  ordem: Ordem;

  constructor(private http: HttpClient, private cestaService: CestaService) { }

  itens() {
    return this.cestaService.itens;
  }

  addItem(produto: Produto) {
    this.cestaService.addItem(produto);
  }

  removeItem(produto: Produto) {
    this.cestaService.removeItem(produto);
  }

  aumentarQtd(cestaItem: CestaItem) {
    this.cestaService.aumentarQtd(cestaItem);
  }

  diminuirQtd(cestaItem: CestaItem) {
    this.cestaService.diminuirQtd(cestaItem);
  }

  hasItens() {
    return this.cestaService.hasItens();
  }

  clear() {
    this.cestaService.clear();
  }

  total() {
    return this.cestaService.total();
  }

  cancelarOrdem(id: number) {
    return this.http.get(`${environment.apiUrl}/ordens/cancelar/${id}`);
  }

  finalizarOrdem(ordem: Ordem) {
    return this.http.post(`${environment.apiUrl}/ordens`, ordem);
  }

  getOrdensPage(current: number) {
    return this.http.get(`${environment.apiUrl}/ordens/page?page=${current}`);
  }

  getOrdensPageCaixa(current: number, caixaId: number) {
    return this.http.get(`${environment.apiUrl}/ordens/caixa/${caixaId}/page?page=${current}`);
  }

}
