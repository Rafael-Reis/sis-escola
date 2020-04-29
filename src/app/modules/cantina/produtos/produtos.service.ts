import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Produto, CategoriaProduto } from './produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  constructor(private http: HttpClient) { }

  create(produto: Produto) {
    return this.http.post(`${environment.apiUrl}/produtos`, produto);
  }

  update(produto: Produto) {
    return this.http.put(`${environment.apiUrl}/produtos`, produto);
  }

  get(id: number){
    return this.http.get(`${environment.apiUrl}/produtos/${id}`);
  }

  getCategorias(): Observable<CategoriaProduto[]>{
    return this.http.get<CategoriaProduto[]>(`${environment.apiUrl}/produtos/categorias`);
  }

  getProdutosCategoriaId(id: number): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${environment.apiUrl}/produtos/categorias/${id}`);
  }

  search(query: string) {
    return this.http.get(`${environment.apiUrl}/produtos/search/${query}`);
  }

  delete(id: number){
    return this.http.delete(`${environment.apiUrl}/produtos/${id}`);
  }

  getPage(current: number){
    return this.http.get(`${environment.apiUrl}/produtos/page/${current}`);
  }

}
