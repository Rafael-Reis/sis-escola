import { AcessoService } from './../../auth/acesso.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cantina',
  templateUrl: './cantina.component.html',
  styleUrls: ['./cantina.component.scss']
})
export class CantinaComponent implements OnInit {


  constructor(public acessoService: AcessoService) { }

  ngOnInit() {


  }

}
