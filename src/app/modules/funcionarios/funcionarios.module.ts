import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';

import { FuncionariosComponent } from './funcionarios.component';
import { FormCadastroFuncionarioComponent } from './form-cadastro-funcionario/form-cadastro-funcionario.component';

const routes: Routes = [
  {path: '', component: FuncionariosComponent},
  {path: 'form', component: FormCadastroFuncionarioComponent},
];

@NgModule({
  declarations: [
    FuncionariosComponent,
    FormCadastroFuncionarioComponent
  ],
  entryComponents: [
    FormCadastroFuncionarioComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class FuncionariosModule { }
