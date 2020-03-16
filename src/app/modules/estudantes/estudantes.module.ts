import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';

import { FormCadastroEstudanteComponent } from './form-cadastro-estudante/form-cadastro-estudante.component';
import { EstudantesComponent } from './estudantes.component';
import { PesquisarEstudanteComponent } from './pesquisar-estudante/pesquisar-estudante.component';
import { ComprasCantinaComponent } from './compras-cantina/compras-cantina.component';
import { FormCadastroPassaportesComponent } from './form-cadastro-passaportes/form-cadastro-passaportes.component';

const routes: Routes = [
  {path: '', component: EstudantesComponent},
  {path: 'form', component: FormCadastroEstudanteComponent},
];

@NgModule({
  declarations: [
    EstudantesComponent,
    FormCadastroEstudanteComponent,
    PesquisarEstudanteComponent,
    PesquisarEstudanteComponent,
    ComprasCantinaComponent,
    FormCadastroPassaportesComponent
  ],
  entryComponents: [
    FormCadastroEstudanteComponent,
    PesquisarEstudanteComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class EstudantesModule { }
