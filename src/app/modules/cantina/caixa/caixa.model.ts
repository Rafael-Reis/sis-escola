import { User } from './../../usuarios/user.model';

export interface Caixa {
  id: number;
  suprimento: number;
  totalAvista?: number;
  totalAprazo?: number;
  dataAbertura: Date;
  dataFechamento?: Date;
  userAbertura: User;
  userFechamento?: User;
}


