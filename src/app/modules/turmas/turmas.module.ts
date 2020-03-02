import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';

import { TurmasComponent } from './turmas.component';
import { FormCadastroTurmaComponent } from './form-cadastro-turma/form-cadastro-turma.component';

const routes: Routes = [
  {path: '', component: TurmasComponent}
];

@NgModule({
  declarations: [
    TurmasComponent,
    FormCadastroTurmaComponent
  ],
  entryComponents: [
    FormCadastroTurmaComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class TurmasModule { }
