import { FileSaverService } from 'ngx-filesaver';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImportacaoBackupService {

  constructor(private http: HttpClient, private fileSaverService: FileSaverService) { }

  atualizarFrequenciaBackup(data) {
    return this.http.put(`${environment.apiUrl}/backup`, data);
  }

  executarBackup() {
    return this.http.get(`${environment.apiUrl}/backup/executar`);
  }

  getParametrosFrequenciaBackup() {
    return this.http.get(`${environment.apiUrl}/backup/frequencias`);
  }

  getUltimoBackup() {
    return this.http.get(`${environment.apiUrl}/backup/ultimo`);
  }

  getFrequenciaBackup() {
    return this.http.get(`${environment.apiUrl}/backup/frequencia`);
  }

  importEstudantes(formData: any) {
    return this.http.post(`${environment.apiUrl}/importar/estudantes`, formData);
  }

  downloadPlanilhaEstudantes() {
    return this.http.get(`${environment.apiUrl}/importar/estudantes/planilha`, {
      responseType: 'blob'
    }).subscribe( (data: Blob) => {
      this.fileSaverService.save(data, 'planilha_importacao.xlsx');
    });
  }

}
