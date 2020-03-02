import { AcessoService } from './../../../auth/acesso.service';
import { ToastService } from './../../../shared/components/toast/toast.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig , DynamicDialogRef} from 'primeng/dynamicdialog';

import { SelectItem } from 'primeng/api';

import { TurmasService } from './..//turmas.service';
import { Turma } from '../turma.model';

@Component({
  selector: 'app-form-cadastro-turma',
  templateUrl: './form-cadastro-turma.component.html'
})
export class FormCadastroTurmaComponent implements OnInit {
  turma: Turma;
  turmaForm: FormGroup;

  anos: SelectItem[] = [];
  turnos: SelectItem[] = [];
  submit = false;

  constructor(
    public acessoService: AcessoService,
    private fb: FormBuilder,
    private toastService: ToastService,
    private turmaService: TurmasService,
    public dialogConfig: DynamicDialogConfig,
    public dialogDynamic: DynamicDialogRef) { }

  ngOnInit() {

    this.turnos = this.turmaService.getTurnos();

    this.createForm();

    if(this.dialogConfig.data && this.dialogConfig.data.hasOwnProperty('turma')) {
      this.turma = this.dialogConfig.data.turma;
      this.setValuesForm(this.turma);
    }

    if(this.acessoService.isNegado()){
      this.turmaForm.disable();
    }

  }

  createForm() {
    this.turmaForm = this.fb.group({
      id:         [''],
      nome:       ['', Validators.required],
      descricao:  [''],
      turno:      ['', Validators.required],
      ano:        ['', Validators.required]
    });
  }

  setValuesForm(turma: Turma) {
    this.turmaForm.patchValue({
      id:        turma.id,
      nome:      turma.nome,
      descricao: turma.descricao,
      turno:     turma.turno,
      ano:       turma.ano,
    });
  }

  getNomeTurno(turno: string){
    const nome = this.turnos.find( (item) => item.value === turno );
    return nome ? nome.label : '';
  }

  formSubmit() {

    if(this.turmaForm.valid && this.submit === false) {

      this.submit = true;

      if(this.turma){

        this.turmaService.update(this.turmaForm.value).subscribe( (turma: Turma) => {
          this.dialogDynamic.close(turma);
          this.toastService.showSuccess("Cadastro Atualizado");
        }, error => {

          this.submit = false;

          if(error.status === 422) {
            this.toastService.showWarn(error.error);
          } else {
            this.toastService.showError('Falha na Operação');
          }

        }, () =>{
          this.submit = false;
        });
      } else {

        this.turmaService.create(this.turmaForm.value).subscribe( (turma: Turma) => {
          this.dialogDynamic.close(turma);
          this.toastService.showSuccess("Cadastro Realizado");
        }, error => {

          this.submit = false;

          if(error.status === 422) {
            this.toastService.showWarn(error.error);
          } else {
            this.toastService.showError('Falha na Operação');
          }

        }, () =>{
          this.submit = false;
        });

      }

    }

  }

}
