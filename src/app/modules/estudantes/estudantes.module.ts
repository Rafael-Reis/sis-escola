import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';

import { FormCadastroEstudanteComponent } from './form-cadastro-estudante/form-cadastro-estudante.component';
import { EstudantesComponent } from './estudantes.component';
import { FormImportEstudanteComponent } from './form-import-estudante/form-import-estudante.component';
import { PesquisarEstudanteComponent } from './pesquisar-estudante/pesquisar-estudante.component';
import { ComprasCantinaComponent } from './compras-cantina/compras-cantina.component';

const routes: Routes = [
  {path: '', component: EstudantesComponent},
  {path: 'form', component: FormCadastroEstudanteComponent},
  {path: 'import', component: FormImportEstudanteComponent}
];

@NgModule({
  declarations: [
    EstudantesComponent,
    FormCadastroEstudanteComponent,
    FormImportEstudanteComponent,
    PesquisarEstudanteComponent,
    PesquisarEstudanteComponent,
    ComprasCantinaComponent
  ],
  entryComponents: [
    FormCadastroEstudanteComponent,
    FormImportEstudanteComponent,
    PesquisarEstudanteComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class EstudantesModule { }
