import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EstudanteService } from '../../../estudantes/estudante.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';

@Component({
  selector: 'app-form-import-estudante',
  templateUrl: './form-import-estudante.component.html'
})
export class FormImportEstudanteComponent implements OnInit {
  ano: string;
  file: File;

  importacao = false;
  submit = false;

  constructor(
    private estudanteService: EstudanteService,
    private toastService: ToastService) { }

  ngOnInit() {}

  selectFile(event: any){
    event.preventDefault();
    this.file = event.target.files[0];
  }

  downloadPlanilha() {
    this.estudanteService.downloadimModeloPlanilha();
  }

  formSubmit() {
    const formData = new FormData();
    formData.append('ano', this.ano);
    formData.append('file', this.file);

    if( this.ano && this.file) {

      this.submit = true;

      this.estudanteService.import(formData).subscribe( () => {
        this.importacao = true;
        this.toastService.showSuccess("Importação Concluida!");
      }, error => {

        if(error.status == 422) {
          this.toastService.showWarn(error.error);
        } else {
          //console.log(error);
          this.toastService.showError("Importação Falhou!");
        }

      });
    } else {
      console.log('Fom inválido')
    }
   // this.estudanteService.import(formData);
  }

}
