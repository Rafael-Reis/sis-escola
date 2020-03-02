export interface Produto {
  id?: number;
  nome: string;
  preco: number;
  estoque: number;
  vencimento?: any;
  categoria: CategoriaProduto;
}

export interface CategoriaProduto {
  id?: number;
  nome: string;
  descricao?: string;
}
