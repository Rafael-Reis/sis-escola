import { AcessoService } from './../../../auth/acesso.service';
import { Ordem } from './../../cantina/ordens/ordem.model';
import { element } from 'protractor';
import { EstudanteService } from './../estudante.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig , DynamicDialogRef} from 'primeng/dynamicdialog';

import { SelectItem } from 'primeng/api';

import { Turma } from '../../turmas/turma.model';
import { Estudante } from './../estudante.model';
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
  numMaxPassaports = 3;
  tiposPassaportes: any[];

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
    this.tiposPassaportes = [
      {label: 'COC', value: 'coc'},
      {label: 'FEC Estudante', value: 'fec1'},
      {label: 'FEC Pais', value: 'fec2'}
    ];

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
      passaportes: this.fb.array([ this.createItemPassaportes() ]),
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

    if(this.estudante.passaportes) {
      this.removeItemPassaportes(0);

      this.estudante.passaportes.forEach(item => {

        this.getFormArrayPassaportes().push(this.fb.group({
          login: item.login,
          senha: item.senha,
          tipo: item.tipo
        }));

      });
    }

  }

  /**
   * formArray de Horarios
  */

  getFormArrayPassaportes(): FormArray {
    return this.formEstudante.get('passaportes') as FormArray;
  }

  createItemPassaportes(): FormGroup {
    return this.fb.group({login: '', senha: '', tipo: ''})
  }

  addItemPassaportes(): void {
    this.getFormArrayPassaportes().push(this.createItemPassaportes());
  }

  removeItemPassaportes(i: number): void {
    this.getFormArrayPassaportes().removeAt(i);
  }

  countItemsPassaportes() {
    return this.getFormArrayPassaportes().length;
  }

  isPassaportTipoSelecionado(tipo: string){
    const items = this.getFormArrayPassaportes().controls;
    return items.find( (item) => tipo && tipo === item.value.tipo );
  }

  setDataNacimento(dataNasc) {
    console.log("NASCIDO: " + dataNasc)
    this.formEstudante.controls['dataNascimento'].setValue(dataNasc);
  }


  formSubmit(){
    if(this.formEstudante.valid){

      this.submit = true;

      //create
      if(!this.estudante){
        console.log('Create')

        this.estudanteService.create(this.formEstudante.value).subscribe( (estudante: Estudante) => {
          this.dialogDynamic.close(estudante);
          this.toast.showSuccess("Cadastrado Realizado");
        }, error => {
          this.submit = false;
        }, () =>  {
          this.submit = false;
        });

      } else { //update
        console.log('update')
        this.estudanteService.update(this.formEstudante.value).subscribe( (estudante: Estudante) => {
          this.dialogDynamic.close(estudante);
          this.toast.showSuccess("Cadastrado Atualizado");
        }, error => {
          this.submit = false;
        }, () =>  {
          this.submit = false;
        });

      }

    }else{

      this.toast.showWarn("Formulário Inválido");

      Object.keys(this.formEstudante.controls).forEach(field => {
        this.formEstudante.get(field).markAsTouched({ onlySelf: true });
      });

      console.log(this.formEstudante.value)

    }
  }

}
