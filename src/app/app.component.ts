import { Component, OnInit } from '@angular/core';

import {MenuItem} from 'primeng/api';
import { User } from './modules/usuarios/user.model';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "SISECOLA";
  items: MenuItem[];

  constructor(private authService: AuthService){ }

  ngOnInit() {

    this.items = [
      {label: 'Painel', routerLink:'painel', routerLinkActiveOptions: '{exact: true}', icon: 'icon-dashboard mr-2'},
      {label: 'Cantina', routerLink:'cantina', routerLinkActiveOptions: '{exact: true}', icon: 'icon-cantina mr-2'},
      {label: 'Estudantes', routerLink:'estudantes', routerLinkActiveOptions: '{exact: true}', icon: 'icon-estudante mr-2'},
      {label: 'Turmas', routerLink:'turmas', routerLinkActiveOptions: '{exact: true}', icon: 'icon-turma mr-2'},
      {label: 'Usuarios', routerLink:'usuarios', routerLinkActiveOptions: '{exact: true}', icon: 'icon-equipe mr-2'},
      {label: 'Geral', routerLink:'geral', routerLinkActiveOptions: '{exact: true}', icon: 'icon-cog mr-2'}
    ];


  }

  getPrimeiroNome() {
    const nome = this.authService.user.name;
    return nome ? nome.slice(0, nome.indexOf(' ')) : '';
  }

  isLogged() {
    return this.authService.isLogged();
  }

  logout() {
    if(confirm("Deseja sair do sistema?")) {
      this.authService.logout();
    }
  }


}
