import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { FileSaverService } from 'ngx-filesaver';

import { Estudante, RespEstudante } from './estudante.model';

@Injectable({
  providedIn: 'root'
})
export class EstudanteService {

  constructor(private http: HttpClient, private fileSaverService: FileSaverService) { }

  create(estudante: Estudante): Observable<RespEstudante> {
    return this.http.post<RespEstudante>(`${environment.apiUrl}/estudantes`, estudante);
  }

  update(estudante: Estudante): Observable<RespEstudante> {
    return this.http.put<RespEstudante>(`${environment.apiUrl}/estudantes`, estudante);
  }

  getId(id: number): Observable<Estudante> {
    return this.http.get<Estudante>(`${environment.apiUrl}/estudantes/${id}`);
  }

  search(query: string): Observable<Estudante[]> {
    return this.http.get<Estudante[]>(`${environment.apiUrl}/estudantes/search/${query}`);
  }

  getComprasCantina(id: number, mes: number) {
    return this.http.get(`${environment.apiUrl}/estudantes/cantina/${id}/${mes}`);
  }

  delete(id: number): Observable<RespEstudante> {
    return this.http.delete<RespEstudante>(`${environment.apiUrl}/estudantes/${id}`);
  }

  getPage(turmaId: number, pageNum: number){
    return this.http.get(`${environment.apiUrl}/estudantes/page/${turmaId}?page=${pageNum}`);
  }

  atualizarPassaportes(data) {
    return this.http.put(`${environment.apiUrl}/estudantes/passaportes`, data);
  }

  downloadPlanilhaAlunosPorTurma(turmaId: number, fileName: string = null) {

    if(fileName !== null){
      fileName + '.xlsx';
    }

    return this.http.get(`${environment.apiUrl}/relatorios/estudantes/planilha/${turmaId}`, {
      responseType: 'blob'
    }).subscribe( (data: Blob)=>{
      this.fileSaverService.save(data, fileName);
    });

  }

}
