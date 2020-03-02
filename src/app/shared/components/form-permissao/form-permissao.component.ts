import { User } from './../../../modules/usuarios/user.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { UsuariosService } from './../../../modules/usuarios/usuarios.service';

@Component({
  selector: 'app-form-permissao',
  templateUrl: './form-permissao.component.html'
})
export class FormPermissaoComponent implements OnInit {
  permissaoForm: FormGroup;
  msgError: string;
  msgWarn: string;
  submit = false;

  @Output() status = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private usuariosService: UsuariosService) { }


  ngOnInit() {

    this.permissaoForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)] ],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)] ]
    });

  }


  formSubmit() {
    if(this.permissaoForm.valid) {
      this.submit = true;
      this.usuariosService.isAdmin( this.permissaoForm.get('username').value , this.permissaoForm.get('password').value )
        .subscribe((user: User) => {
          this.status.emit(user);
      }, error => {
          this.submit = false;

          if(error.status === 422) {
            this.msgError = error.error;
          }

          if(error.status === 401) {
            this.msgWarn = error.error;
          }
      }, () => {
        this.submit = false;
      });
    }
  }
}
