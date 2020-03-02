import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { OrdensService } from './../ordens/ordens.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html'
})
export class RelatoriosComponent implements OnInit {

  itensMenu: MenuItem[];
  active: MenuItem;

  constructor(private router: Router, private ordensService: OrdensService) { }

  ngOnInit() {

    this.itensMenu = [
      {label: 'Caixas', icon: 'pi pi-desktop', routerLink: {outlets: { outletRelatorio: ['caixas']} } },
    ];

    this.active = this.itensMenu[0];
  //  this.router.navigateByUrl('cantina/relatorios/(outletRelatorio:caixas)');


  }


}
