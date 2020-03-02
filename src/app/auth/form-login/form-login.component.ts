import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from './../auth.service';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html'
})
export class FormLoginComponent implements OnInit {
  loginForm: FormGroup;
  navigateTo: string;
  msgError: string;
  submit = false;

  @Output() status = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService) { }


  ngOnInit() {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(45)] ],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)] ]
    });

  }

  login() {
    if(this.loginForm.valid) {
      this.submit = true;
      this.loginForm.disable();

      this.authService.login( this.loginForm.get('username').value , this.loginForm.get('password').value )
      .subscribe(response => {
        this.status.emit(true);
      }, error => {

        this.submit = false;
        this.loginForm.enable();

        if(error.status === 401) {
          this.msgError = error.error;
        }

      }, () => {
        this.submit = false;
        this.loginForm.enable();
      });

    } else {
      Object.keys(this.loginForm.controls).forEach(field => {
        this.loginForm.get(field).markAsTouched({ onlySelf: true });
      });
    }
  }

}
