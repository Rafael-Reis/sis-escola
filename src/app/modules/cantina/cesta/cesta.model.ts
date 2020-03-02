import { Produto } from './../produtos/produto.model';

export class CestaItem {

  constructor(public produto: Produto, public quantidade: number = 1) {}

  valor(): number {
    return this.produto.preco * this.quantidade;
  }

}
