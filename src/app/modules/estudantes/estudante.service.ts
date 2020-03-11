import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { FileSaverService } from 'ngx-filesaver';

import { Estudante } from './estudante.model';

@Injectable({
  providedIn: 'root'
})
export class EstudanteService {

  constructor(private http: HttpClient, private fileSaverService: FileSaverService) { }

  create(estudante: Estudante) {
    return this.http.post(`${environment.apiUrl}/estudantes`, estudante);
  }

  update(estudante: Estudante) {
    return this.http.put(`${environment.apiUrl}/estudantes`, estudante);
  }

  get(id: number){
    return this.http.get(`${environment.apiUrl}/estudantes/${id}`);
  }

  search(query: string){
    return this.http.get(`${environment.apiUrl}/estudantes/search/${query}`);
  }

  getComprasCantina(id: number, mes: number) {
    return this.http.get(`${environment.apiUrl}/estudantes/cantina/${id}/${mes}`);
  }

  delete(id: number){
    return this.http.delete(`${environment.apiUrl}/estudantes/${id}`);
  }

  getPage(turmaId: number, pageNum: number){
    return this.http.get(`${environment.apiUrl}/estudantes/page/${turmaId}?page=${pageNum}`);
  }

  downloadPlanilhaAlunosPorTurma(turmaId: number, fileName: string = null) {

    if(fileName !== null){
      fileName + '.xlsx';
    }

    return this.http.get(`${environment.apiUrl}/relatorios/planilha/estudantes/${turmaId}`, {
      responseType: 'blob'
    }).subscribe( (data: Blob)=>{
      this.fileSaverService.save(data, fileName);
    });

  }

}
