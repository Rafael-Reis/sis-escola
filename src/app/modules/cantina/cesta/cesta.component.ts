import { Component, OnInit } from '@angular/core';

import { CestaService } from './cesta.service';
import { CestaItem } from './cesta.model';
import { Produto } from './../produtos/produto.model';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.scss']
})
export class CestaComponent implements OnInit {

  constructor(private cestaService: CestaService) { }

  ngOnInit() {
  }

  items() {
    return this.cestaService.itens;
  }

  alterarQtd(item: CestaItem, qtd: any) {
    const quantidade =  parseInt(qtd);
    if(quantidade > 0) {
      this.cestaService.alterarQtd(item, quantidade);
    } else {
      this.removeItem(item.produto);
    }
  }

  addItem(produto: Produto) {
    this.cestaService.addItem(produto);
  }

  removeItem(produto: Produto) {
    this.cestaService.removeItem(produto);
  }

  aumentarQtd(item: CestaItem) {
    this.cestaService.aumentarQtd(item);
  }

  diminuirQtd(item: CestaItem) {
    this.cestaService.diminuirQtd(item);
  }

  total() {
    return this.cestaService.total();
  }

}
