import { Funcionario } from './../funcionario.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastService } from './../../../shared/components/toast/toast.service';
import { FuncionariosService } from './../funcionarios.service';
import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Funcao } from '../funcionario.model';

@Component({
  selector: 'app-form-cadastro-funcionario',
  templateUrl: './form-cadastro-funcionario.component.html'
})
export class FormCadastroFuncionarioComponent implements OnInit {
  funcionarioForm: FormGroup;
  funcionario: Funcionario;
  optionsFuncoes: SelectItem[] = [];

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private funcionariosService: FuncionariosService,
    private dialogConfig: DynamicDialogConfig,
    private dialogDynamic: DynamicDialogRef) { }

  ngOnInit() {
    this.createForm();
    this.loadFuncoes();

    if(this.dialogConfig.data){
       this.funcionario = this.dialogConfig.data.funcionario;
       this.setValuesForm(this.funcionario);
    }
  }

  createForm() {
    this.funcionarioForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      sexo: ['m', Validators.required],
      email: [''],
      celular: [''],
      funcaoId: ['', Validators.required]
    });
  }

  setValuesForm(funcionario: Funcionario) {
    this.funcionarioForm.patchValue({
      id:             funcionario.id,
      nome:           funcionario.nome,
      dataNascimento: funcionario.dataNascimento,
      sexo:           funcionario.sexo,
      email:          funcionario.email,
      celular:        funcionario.celular,
      funcaoId:       funcionario.funcao.id,
    });
  }

  loadFuncoes() {
    this.funcionariosService.getFuncoes().subscribe((funcoes: Funcao[]) => {
      if(funcoes.length > 0) {
        funcoes.forEach( item => {
          this.optionsFuncoes.push({label: item.nome, value: item.id});
        });
      }
    });
  }


  formSubmit() {
    if(this.funcionarioForm.valid) {
      if(this.funcionario) {

        this.funcionariosService.update(this.funcionarioForm.value).subscribe((resp: any) => {
          this.toastService.showSuccess(resp.message);
          this.dialogDynamic.close(resp.data);
        }, error => {
          this.toastService.showError('Falha na Operação');
        });

     } else {

        this.funcionariosService.create(this.funcionarioForm.value).subscribe((resp: any) => {
          this.toastService.showSuccess(resp.message);
          this.dialogDynamic.close(resp.data);
        }, error => {
          this.toastService.showError('Falha na Operação');
        });

      }
    }
  }


}
