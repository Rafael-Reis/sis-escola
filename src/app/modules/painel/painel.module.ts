import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';

import { PainelComponent } from './painel.component';

const routes: Routes = [
  {path: '', component: PainelComponent},
];

@NgModule({
  declarations: [PainelComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PainelModule { }
