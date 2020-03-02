import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

import { UsuariosComponent } from './usuarios.component';
import { FormCadastroUsuariosComponent } from './form-cadastro-usuarios/form-cadastro-usuarios.component';

const routes: Routes = [
  {path: '', component: UsuariosComponent},
  {path: 'form', component: FormCadastroUsuariosComponent},
];

@NgModule({
  declarations: [
    UsuariosComponent,
    FormCadastroUsuariosComponent
  ],
  entryComponents: [
    FormCadastroUsuariosComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class UsuariosModule { }
