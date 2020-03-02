import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.scss']
})
export class TelaLoginComponent implements OnInit {

  constructor(private authService: AuthService) { }


  ngOnInit() {

    if(this.authService.isLogged()){
      this.authService.redirectHomePage();
    }

  }

  statusLogin(status: boolean) {
    if(status) {
      this.authService.redirectHomePage();
    }
  }



}
