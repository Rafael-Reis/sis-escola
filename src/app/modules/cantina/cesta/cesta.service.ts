import { Injectable } from '@angular/core';
import { CestaItem } from './cesta.model';
import { Produto } from './../produtos/produto.model';

@Injectable({
  providedIn: 'root'
})
export class CestaService {
  itens: CestaItem[] = [];

  constructor() { }

  addItem(produto: Produto) {
    const item = this.itens.find( (ordemItem) => ordemItem.produto.id === produto.id );

    if(item){
      this.aumentarQtd(item);
    } else {
      this.itens.push(new CestaItem(produto));
    }

  }

  removeItem(produto: Produto) {
    const item = this.itens.find( (ordemItem) => ordemItem.produto.id === produto.id );

    if(item){
      this.diminuirQtd(item);
    }
  }

  aumentarQtd(item: CestaItem) {
    item.quantidade += 1;
  }

  diminuirQtd(item: CestaItem) {
    if(item.quantidade <= 1){
      this.itens.splice(this.itens.indexOf(item), 1);
    }else if(item.quantidade > 1){
      item.quantidade -= 1;
    }
  }

  alterarQtd(item: CestaItem, qtd: number) {
    if(qtd >= 0 && qtd !== item.quantidade ) {
      item.quantidade =  qtd;
    }
  }

  hasItens() {
    return this.itens.length > 0;
  }

  clear() {
    this.itens = [];
  }

  total() {
    return this.itens.map(item => item.valor()).reduce((prev, value)=> prev+value, 0);
  }


}


