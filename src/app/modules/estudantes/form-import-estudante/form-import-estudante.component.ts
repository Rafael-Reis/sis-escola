import { Component, OnInit, forwardRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Estudante } from './../estudante.model';
import { EstudanteService } from './../estudante.service';
import { ToastService } from './../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-form-import-estudante',
  templateUrl: './form-import-estudante.component.html'
})
export class FormImportEstudanteComponent implements OnInit {
  estudantes: Estudante[] = [];
  formImport: FormGroup;
  cols: any[];

  importacao = false;
  submit = false;

  file: File;

  constructor(
    private fb: FormBuilder,
    private estudanteService: EstudanteService,
    private toastService: ToastService) { }

  ngOnInit() {

    this.formImport = this.fb.group({
      ano: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4) ]],
      turma: [''],
    });

    this.cols = [
      {field: 'nome', header: 'Nome'},
      {field: 'dataNascimetno', header: 'Data Nascimento'},
      {field: 'sexo', header: 'Sexo'},
      {field: 'nome', header: 'Turma'}
    ];

  }

  selectFile(event){
    event.preventDefault();
    this.file = event.target.files[0];
    console.log(this.file)
  }

  downloadPlanilha() {
    this.estudanteService.downloadimModeloPlanilha();
  }

  formSubmit() {
    const formData = new FormData();
    formData.append('ano', this.formImport.get('ano').value);
    formData.append('turma', this.formImport.get('turma').value);
    formData.append('file', this.file);

    if( this.formImport.valid && this.file) {

      this.submit = true;

      this.estudanteService.import(formData).subscribe( () => {
        this.importacao = true;
        setTimeout( () => location.reload() , 2000);
      }, error => {

        if(error.status == 422) {
          this.toastService.showWarn(error.error);
        } else {
          console.log(error);
          this.toastService.showError("Importação Falhou!");
        }

      });
    } else {
      console.log('Fom inválido')
    }
   // this.estudanteService.import(formData);
  }

}
