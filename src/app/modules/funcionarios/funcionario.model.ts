import { Paginacao } from './../../shared/models/paginacao.model';

export interface Funcionario {
  id?: number;
  nome: string;
  dataNascimento: Date;
  sexo: string;
  email: string;
  celular: string;
  situacao: string;
  funcao: Funcao;
}

export interface FuncionarioPage {
  funcionarios: Funcionario[];
  paginacao: Paginacao;
}

export interface Funcao {
  id?: number;
  nome: string;
}
