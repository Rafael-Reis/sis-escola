import { AcessoService } from './../../../auth/acesso.service';
import { Ordem } from './../../cantina/ordens/ordem.model';
import { element } from 'protractor';
import { EstudanteService } from './../estudante.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig , DynamicDialogRef} from 'primeng/dynamicdialog';

import { SelectItem } from 'primeng/api';

import { Turma } from '../../turmas/turma.model';
import { Estudante, RespEstudante } from './../estudante.model';
import { ToastService } from './../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-form-cadastro-estudante',
  templateUrl: './form-cadastro-estudante.component.html'
})
export class FormCadastroEstudanteComponent implements OnInit {
  turma: Turma;
  estudante: Estudante;
  ordens: Ordem[];

  turmasSelect: SelectItem[] = [];
  situacaoSelect: SelectItem[] = [];

  formEstudante: FormGroup;
  dataNascimento: any;

  submit = false;

  constructor(
    public acessoService: AcessoService,
    private fb: FormBuilder,
    private el: ElementRef,
    private toast: ToastService,
    public dialogService: DialogService,
    public dialogConfig: DynamicDialogConfig,
    public dialogDynamic: DynamicDialogRef,
    private estudanteService: EstudanteService,
    ) { }

  ngOnInit() {

    this.setSelectValues();
    this.createForm();

    //Dados Modal
    if(this.dialogConfig.data) {

      this.turma = this.dialogConfig.data.turma;

      this.dialogConfig.data.turmas.forEach(turma => {
        this.turmasSelect.push({label: turma.nome, value: turma.id});
      });

      if(this.turma) {
        this.formEstudante.controls['turmaId'].setValue(this.turma.id);
      }

      //Dados Modal Update
      if(this.dialogConfig.data.hasOwnProperty('estudante')) {
        this.turma = null;
        this.estudante = this.dialogConfig.data.estudante;
        this.dataNascimento = this.estudante.dataNascimento;

        this.setValueForm(this.estudante);
      }

    }

    if(this.acessoService.isNegado()) {
      this.formEstudante.disable();
    }


  }

  setSelectValues() {

    this.situacaoSelect = [
      {label: "Matriculado", value: 'matriculado'},
      {label: "Transferido", value: 'transferido'},
      {label: "Pendente",    value: 'pendente'}
    ];
  }

  createForm() {
    this.formEstudante = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      email: [''],
      dataNascimento: ['', Validators.required],
      celular: [''],
      sexo: ['m', Validators.required],
      situacao: [ this.situacaoSelect[0].value , Validators.required],
      turmaId: ['', Validators.required],
      endereco: this.fb.group({
        rua: [''],
        numero: [''],
        bairro: [''],
        complemento: ['']
      }),

    });
  }

  setValueForm(estudante: Estudante) {

    this.formEstudante.patchValue({
      id: estudante.id,
      nome: estudante.nome,
      email: estudante.email,
      dataNascimento: estudante.dataNascimento,
      celular: estudante.celular,
      sexo: estudante.sexo,
      situacao: estudante.situacao,
      turmaId: estudante.turma.id,
      endereco: {
        rua: estudante.endereco.rua,
        numero: estudante.endereco.numero,
        bairro: estudante.endereco.bairro,
        complemento: estudante.endereco.complemento
      },
    });

  }


  setDataNacimento(dataNasc) {
    console.log("NASCIDO: " + dataNasc)
    this.formEstudante.controls['dataNascimento'].setValue(dataNasc);
  }

  formSubmit(){
    if(this.formEstudante.valid){

      this.submit = true;

      const req = !this.estudante ? this.estudanteService.create(this.formEstudante.value)
                                  : this.estudanteService.update(this.formEstudante.value) ;

      req.subscribe( (resp: RespEstudante) => {
        this.submit = false;
        this.toast.showSuccess(resp.message);
        this.dialogDynamic.close(resp.estudante);
      }, error => {
        this.submit = false;
        this.toast.showErrorResponse(error);
      });

    }else{

      this.toast.showWarn("Formulário Inválido");

      Object.keys(this.formEstudante.controls).forEach(field => {
        this.formEstudante.get(field).markAsTouched({ onlySelf: true });
      });

    }
  }

}
