import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ToastService } from './../../../shared/components/toast/toast.service';
import { EstudanteService } from './../estudante.service';
import { Estudante } from './../estudante.model';
import { AcessoService } from './../../../auth/acesso.service';

@Component({
  selector: 'app-form-cadastro-passaportes',
  templateUrl: './form-cadastro-passaportes.component.html'
})
export class FormCadastroPassaportesComponent implements OnInit {
  passaportesForm: FormGroup;
  tiposPassaportes: any[];
  numMaxPassaports = 3;
  submit = false;

  @Input() estudante?: Estudante;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    public acessoService: AcessoService,
    private estudanteService: EstudanteService) { }

  ngOnInit() {
    this.createForm();
    this.setValuesForm();
  }

  createForm() {
    this.passaportesForm = this.fb.group({
      id: [this.estudante.id],
      passaportes: this.fb.array([ this.createItemPassaportes() ]),
    });
  }

  setValuesForm() {

    this.tiposPassaportes = [
      {label: 'COC', value: 'coc'},
      {label: 'FEC Estudante', value: 'fec1'},
      {label: 'FEC Pais', value: 'fec2'}
    ];

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

  getFormArrayPassaportes(): FormArray {
    return this.passaportesForm.get('passaportes') as FormArray;
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

  formSubmit() {
    if(this.passaportesForm.valid){

      this.submit = true;

      this.estudanteService.atualizarPassaportes(this.passaportesForm.value).subscribe( (data: any) => {
        this.toastService.showSuccess(data.message);
      }, error => {
        this.toastService.showError("FFalaha na Operação!");
        this.submit = false;
      }, () =>  {
        this.submit = false;
      });

    }
  }



}
