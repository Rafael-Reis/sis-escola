import { ToastService } from './../../../shared/components/toast/toast.service';
import { ImportacaoBackupService } from './importacao-backup.service';
import {  DialogService } from 'primeng/dynamicdialog';
import { SelectItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

import { FormImportEstudanteComponent } from './form-import-estudante/form-import-estudante.component';

export interface Backup {
  localizacao: string;
  created_at: Date;
}

@Component({
  selector: 'app-importacao-backup',
  templateUrl: './importacao-backup.component.html'
})
export class ImportacaoBackupComponent implements OnInit {
  anoLetivo: string;
  planilha: File;
  backup: Backup;

  frequencia: number;
  optionsFrequencia: SelectItem[] = [];

  constructor(
    private dialogService: DialogService,
    private toastService: ToastService,
    private importacaoBackupService: ImportacaoBackupService) { }

  ngOnInit() {

    this.importacaoBackupService.getParametrosFrequenciaBackup()
    .subscribe((param: number[]) => {
      param.forEach( i => {
        this.optionsFrequencia.push({label: 'há cada ' + i + ' dias' , value: i});
      });
    });

    this.importacaoBackupService.getFrequenciaBackup()
    .subscribe( (frequencia: number) => {
      this.frequencia = frequencia ;

      console.log(this.frequencia)
    });

    this.importacaoBackupService.getUltimoBackup()
    .subscribe( (backup: Backup) => {
      this.backup = backup;
    });

  }

  executarBackup() {
    this.importacaoBackupService.executarBackup().subscribe( (data: any) => {
      this.toastService.showSuccess(data.message);
    }, error => {
      this.toastService.showError('Falha na geração do Backup!');
    });
  }

  showModalFormImport(){
    const ref = this.dialogService.open(FormImportEstudanteComponent, {
      header: 'Importar Estudantes',
      width: '80%',
    });
  }

  formSubmit() {
    if(this.frequencia) {
      this.importacaoBackupService.atualizarFrequenciaBackup({frequencia: this.frequencia})
      .subscribe((data: any) => {
        this.toastService.showSuccess(data.message);
      });
    }
  }


}
