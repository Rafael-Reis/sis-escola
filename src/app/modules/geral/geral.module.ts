import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';

import { GeralComponent} from './geral.component';

const routes: Routes = [
  {path: '',            component: GeralComponent},
//  {path: 'geral',       component: TabGeralComponent},
//  {path: 'backup',      component: TabBackupComponent}
];


@NgModule({
  declarations: [
    GeralComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class GeralModule { }
