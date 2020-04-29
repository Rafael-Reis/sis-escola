import { Component, OnInit } from '@angular/core';
import { trigger, state,style,animate,transition} from '@angular/animations';
import {MenuItem} from 'primeng/api';
import { AuthService } from './auth/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('menuMobile', [

      state('open', style({
        left: '0',
        opacity: 1
      })),

      state('closed', style({
        left: '-250px',
        opacity: 0.5
      })),

      transition('open <=> closed', [
        animate('0.3s'),
      ]),

    ])
  ]
})
export class AppComponent {
  title = "SISESCOLA";
  isOpen = true;
  items: MenuItem[];

  constructor(
    private authService: AuthService,
    private deviceDetectorService: DeviceDetectorService){ }

  ngOnInit() {

    this.menu();
    this.isOpen = this.deviceDetectorService.isMobile() ? false : true ;

  }

  nomeUsuario() {
    const nome = this.authService.user.name;
    return nome ? nome.slice(0, nome.indexOf(' ')) : '';
  }

  menu() {
    this.items = [
      {label: 'Painel', routerLink:'painel', routerLinkActiveOptions: '{exact: true}', icon: 'icon-dashboard mr-2', command: (event) => {this.toggleMenu()} },
      {label: 'Cantina', routerLink:'cantina', routerLinkActiveOptions: '{exact: true}', icon: 'icon-cantina mr-2', command: (event) => {this.toggleMenu()} },
      {label: 'Estudantes', routerLink:'estudantes', routerLinkActiveOptions: '{exact: true}', icon: 'icon-estudante mr-2', command: (event) => {this.toggleMenu()} },
      {label: 'Funcionarios', routerLink:'funcionarios', routerLinkActiveOptions: '{exact: true}', icon: 'icon-teamwork mr-2', command: (event) => {this.toggleMenu()} },
      {label: 'Turmas', routerLink:'turmas', routerLinkActiveOptions: '{exact: true}', icon: 'icon-turma mr-2', command: (event) => {this.toggleMenu()} },
      {label: 'Usuarios', routerLink:'usuarios', routerLinkActiveOptions: '{exact: true}', icon: 'icon-equipe mr-2', command: (event) => {this.toggleMenu()} },
      {label: 'Geral', routerLink:'geral', routerLinkActiveOptions: '{exact: true}', icon: 'icon-cog mr-2', command: (event) => {this.toggleMenu()} }
    ];
  }

  toggleMenu() {
    if(this.deviceDetectorService.isMobile()) {
      this.isOpen = !this.isOpen;
    }
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
