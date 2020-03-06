import {  DialogService } from 'primeng/dynamicdialog';
import { SelectItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

import { FormImportEstudanteComponent } from './form-import-estudante/form-import-estudante.component';

@Component({
  selector: 'app-importacao-backup',
  templateUrl: './importacao-backup.component.html'
})
export class ImportacaoBackupComponent implements OnInit {
  anoLetivo: string;
  planilha: File;

  intervalo: number;
  selectIntervalo: SelectItem[] = [];

  constructor(private dialogService: DialogService) { }

  ngOnInit() {

    this.valuesSelect();

  }


  valuesSelect() {

    this.selectIntervalo = [
      {label: 'Todos os dias' , value: 1},
      {label: 'há cada 2 dias' , value: 1},
      {label: 'há cada 7 dias' , value: 1},
      {label: 'há cada 15 dias' , value: 1},
      {label: 'há cada 30 dias' , value: 1}
    ];

  }

  showModalFormImport(){
    const ref = this.dialogService.open(FormImportEstudanteComponent, {
      header: 'Importar Estudantes',
      width: '80%',
    });
  }


}
