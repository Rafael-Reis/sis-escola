import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelaLoginComponent } from './auth/tela-login/tela-login.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: 'painel', pathMatch: 'full'},
  {path: 'login', component: TelaLoginComponent,
    children: [
      {path: ':to', component: TelaLoginComponent },
    ]
  },
  {path: 'painel', loadChildren: './modules/painel/painel.module#PainelModule', canLoad: [AuthGuard]},
  {path: 'cantina', loadChildren: './modules/cantina/cantina.module#CantinaModule', canLoad: [AuthGuard]},
  {path: 'estudantes', loadChildren: './modules/estudantes/estudantes.module#EstudantesModule', canLoad: [AuthGuard]},
  {path: 'turmas', loadChildren: './modules/turmas/turmas.module#TurmasModule', canLoad: [AuthGuard]},
  {path: 'usuarios', loadChildren: './modules/usuarios/usuarios.module#UsuariosModule', canLoad: [AuthGuard]},
  {path: 'geral', loadChildren: './modules/geral/geral.module#GeralModule', canLoad: [AuthGuard]},
  {path: '**', redirectTo: 'painel'},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
