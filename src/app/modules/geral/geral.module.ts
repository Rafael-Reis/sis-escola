import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';

import { GeralComponent} from './geral.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import { ImportacaoBackupComponent } from './importacao-backup/importacao-backup.component';
import { FormImportEstudanteComponent } from './importacao-backup/form-import-estudante/form-import-estudante.component';

const routes: Routes = [
  {path: '',            component: GeralComponent},
//  {path: 'geral',       component: TabGeralComponent},
//  {path: 'backup',      component: TabBackupComponent}
];


@NgModule({
  declarations: [
    GeralComponent,
    ConfiguracoesComponent,
    ImportacaoBackupComponent,
    FormImportEstudanteComponent
  ],
  entryComponents: [
    FormImportEstudanteComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class GeralModule { }
