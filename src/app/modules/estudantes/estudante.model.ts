import { Paginacao } from './../../shared/models/paginacao.model';
import { Turma } from '../turmas/turma.model';

export interface RespEstudante {
  message: string;
  estudante?: Estudante;
}

export interface PageEstudante {
  estudantes: Estudante[];
  paginacao: Paginacao;
}

export interface Estudante {
  id?: number;
  nome: string;
  email: string;
  dataNascimento: Date;
  celular: number;
  passaportes?: any;
  situacao: Situacao;
  sexo: string;
  endereco: Endereco;
  turma: Turma;
}

export interface Endereco {
  rua: string;
  numero: number;
  bairro: string;
  complemento: string;
}

enum Situacao {
  matriculado = 'Matriculado',
  transferido = 'Transferido',
  pendente    = 'Pendente',
}
