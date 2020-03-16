import { ToastService } from './../../../shared/components/toast/toast.service';
import { ImportacaoBackupService } from './importacao-backup.service';
import {  DialogService } from 'primeng/dynamicdialog';
import { SelectItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

import { FormImportEstudanteComponent } from './form-import-estudante/form-import-estudante.component';

export interface StatusBackup {
  frequencia: number;
  frequencias: number[];
  backup: {
    localizacao: string;
    created_at: Date;
  }
}

@Component({
  selector: 'app-importacao-backup',
  templateUrl: './importacao-backup.component.html'
})
export class ImportacaoBackupComponent implements OnInit {
  anoLetivo: string;
  planilha: File;

  frequencia: number;
  statusBackup: StatusBackup;
  optionsFrequencia: SelectItem[] = [];

  constructor(
    private dialogService: DialogService,
    private toastService: ToastService,
    private importacaoBackupService: ImportacaoBackupService) { }

  ngOnInit() {
    this.getStatusBackup();
  }

  getStatusBackup() {
    this.importacaoBackupService.getStatus().subscribe( (StatusBackup: StatusBackup) => {
      this.frequencia = StatusBackup.frequencia;
      this.statusBackup = StatusBackup;

      if(StatusBackup.frequencias.length > 0) {
        StatusBackup.frequencias.forEach( i => {
          this.optionsFrequencia.push({label: 'ha cada ' + i + ' dias', value: i });
        });
      }

    });
  }

  executarBackup() {
    this.importacaoBackupService.create().subscribe( (data: any) => {
      this.toastService.showSuccess(data.message);
    }, error => {
      this.toastService.showError('Falha na geração do Backup!');
    });
  }

  showModalFormImport(){
    const ref = this.dialogService.open(FormImportEstudanteComponent, {
      header: 'Importar Estudantes',
      styleClass: 'dialog-large dialog-overflow'
    });
  }

  formSubmit() {
    if(this.frequencia) {
      this.importacaoBackupService.update({frequencia: this.frequencia})
      .subscribe((data: any) => {
        this.toastService.showSuccess(data.message);
      });
    }
  }


}
