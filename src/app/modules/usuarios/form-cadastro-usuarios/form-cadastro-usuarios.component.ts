import { AcessoService } from './../../../auth/acesso.service';
import { AuthService } from './../../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from './../../../shared/components/toast/toast.service';

import { User } from '../user.model';
import { UsuariosService } from './../usuarios.service';

@Component({
  selector: 'app-form-cadastro-usuarios',
  templateUrl: './form-cadastro-usuarios.component.html',

})
export class FormCadastroUsuariosComponent implements OnInit {
  user: User;
  userPasse: User;
  usuarioForm: FormGroup;

  niveis: any;
  submit = false;
  ocultarSenha = false;

  constructor(
    public acessoService: AcessoService,
    private fb: FormBuilder,
    public dialogService: DialogService,
    public dialogConfig: DynamicDialogConfig,
    public dialogDynamic: DynamicDialogRef,
    private usuariosService: UsuariosService,
    private toastService: ToastService) { }

  ngOnInit() {

    this.niveis = [
      {label: 'Usuario', value: 'usuario'},
      {label: 'Operador', value: 'operador'},
      {label: 'Administrador', value: 'administrador'}
    ];

    this.usuarioForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: [''],
      password: [''],
      nivel: ['', Validators.required]
    });

    if(this.acessoService.isNegado()) {
      this.usuarioForm.disable();
    }

    if(this.dialogConfig.data && this.dialogConfig.data.hasOwnProperty('user')) {

      this.user = this.dialogConfig.data.user;
      this.ocultarSenha = true;

      this.usuarioForm.patchValue({
        id:    this.user.id,
        name:  this.user.name,
        email: this.user.email,
        nivel: this.user.nivel
      });

    } else {

      this.usuarioForm.controls['password'].setValidators([Validators.required]);

    }
  }

  gerarSenha() {
    const senha = Math.floor((Math.random() * 100000) + 100000).toString();
    this.usuarioForm.controls['password'].setValue(senha);
  }

  alterarSenha() {
    this.ocultarSenha = this.ocultarSenha ? false : true ;
  }

  formSubmit() {

    if(this.usuarioForm.valid) {
      this.submit = true;

      if(this.user) {
        this.usuariosService.update(this.usuarioForm.value).subscribe( (user: User) => {
          this.dialogDynamic.close(user);
          this.toastService.showSuccess("Cadastro do usuário Atualizado");
        }, error =>{
          this.submit = false;
        }, () => {
          this.submit = false;
        });
      } else {
        this.usuariosService.create(this.usuarioForm.value).subscribe( (user: User) => {
          this.dialogDynamic.close(user);
          this.toastService.showSuccess("Usuário Cadastrado");
        }, error =>{
          this.submit = false;
        }, () => {
          this.submit = false;
        });
      }

    }

  }

  excluirUser() {
    this.usuariosService.delete(this.user.id).subscribe( (message: string) => {
      this.dialogDynamic.close(this.user.id);
      this.toastService.showSuccess(message);
    });
  }

}
