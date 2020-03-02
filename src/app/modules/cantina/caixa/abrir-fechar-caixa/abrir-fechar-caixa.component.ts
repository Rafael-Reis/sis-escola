import { User } from './../../../usuarios/user.model';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from '../../../../auth/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CaixaService } from '../caixa.service';
import { Caixa } from '../caixa.model';

@Component({
  selector: 'app-abrir-fechar-caixa',
  templateUrl: './abrir-fechar-caixa.component.html'
})
export class AbrirFecharCaixaComponent implements OnInit {
  caixa: Caixa;
  admin: User;

  formAbrirCaixa: FormGroup;
  formFecharCaixa: FormGroup;

  caixaId: number;
  opcao: string; //abrir, fechar
  submit = false;

  hoje = new Date();

  constructor(
    private fb: FormBuilder,
    public  authService: AuthService,
    private caixaService: CaixaService,
    private toastService: ToastService,
    private dynamicDialogRef: DynamicDialogRef,
    public  dialogConfig: DynamicDialogConfig,) { }

  ngOnInit() {

    this.formAbrirCaixa = this.fb.group({
      'suprimento': ['', Validators.required],
    });

    this.formFecharCaixa = this.fb.group({
      'caixaId': ['', Validators.required],
      'userId': ['', Validators.required],
    });



    if(this.dialogConfig.data) {

      if(this.dialogConfig.data.hasOwnProperty('opcao')){
        this.opcao = this.dialogConfig.data.opcao;

        if(this.dialogConfig.data.hasOwnProperty('caixaId')){
          this.caixaId = this.dialogConfig.data.caixaId;
        }
      }

    }

  }

  /**
   * Pede para o usuario digitar as credenciais novamente
   * O caixa pode ser fechado apenas por usuários com nivel de administrador
   */
  confirmAdmin(user: User) {
    this.admin = user;



    this.caixaService.conferir( this.caixaId || null ).subscribe( (caixa: Caixa) => {
      this.caixa = caixa;

      this.formFecharCaixa.patchValue({
        caixaId: this.caixa.id,
        userId: this.admin.id
      });

    });
  }

  formSubmitAbrirCaixa() {
    if(this.formAbrirCaixa.valid) {
      this.submit = true;
      this.caixaService.abrirCaixa(this.formAbrirCaixa.value).subscribe( (caixa: Caixa) => {
        this.dynamicDialogRef.close(caixa);
        this.toastService.showSuccess('Caixa Aberto.');
      }, error => {
        this.submit = false;
        this.toastService.showError(error.error);
      }, () => {
        this.submit = false;
      });

    } else {

      Object.keys(this.formAbrirCaixa.controls).forEach(field => {
        this.formAbrirCaixa.get(field).markAsTouched({ onlySelf: true });
      });

    }
  }

  cancelarFechamento() {
    this.dynamicDialogRef.close(false);
  }

  confirmarFechamento() {

    if(this.formFecharCaixa.valid) {

      this.caixaService.fecharCaixa(this.formFecharCaixa.value).subscribe( (message: string) => {
        this.dynamicDialogRef.close(true);
        this.toastService.showSuccess(message);
      }, error => {
        this.toastService.showError(error.error);
      });

    }

  }

}
