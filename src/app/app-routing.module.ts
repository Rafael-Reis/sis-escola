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
  {path: 'painel', loadChildren: () => import('./modules/painel/painel.module').then(m => m.PainelModule) , canLoad: [AuthGuard]},
  {path: 'cantina', loadChildren: () => import('./modules/cantina/cantina.module').then(m => m.CantinaModule), canLoad: [AuthGuard]},
  {path: 'estudantes', loadChildren: () => import( './modules/estudantes/estudantes.module').then(m => m.EstudantesModule), canLoad: [AuthGuard]},
  {path: 'funcionarios', loadChildren: () => import( './modules/funcionarios/funcionarios.module').then(m => m.FuncionariosModule), canLoad: [AuthGuard]},
  {path: 'turmas', loadChildren: () => import( './modules/turmas/turmas.module').then(m => m.TurmasModule), canLoad: [AuthGuard]},
  {path: 'usuarios', loadChildren: () => import( './modules/usuarios/usuarios.module').then(m => m.UsuariosModule), canLoad: [AuthGuard]},
  {path: 'geral', loadChildren: () => import( './modules/geral/geral.module').then(m => m.GeralModule), canLoad: [AuthGuard]},
  {path: '**', redirectTo: 'painel'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
