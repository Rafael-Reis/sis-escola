import { CestaItem } from './../cesta/cesta.model';
import { Cliente } from '../clientes/cliente.model';
import { Caixa } from '../caixa/caixa.model';

export class Ordem {
  constructor( public cliente: Cliente, public pagamento: string, public itens: CestaItem[] = []) {}
}

export interface OrdemItem {
  id: number;
  pagamento: string;
  cliente: Cliente;
  itens: CestaItem[];
  total: number;
  caixa: Caixa;
  updated: Date;
  created: Date;
  deleted: Date;
}
