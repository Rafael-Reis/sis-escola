import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Turma } from './turma.model';

@Injectable({
  providedIn: 'root'
})
export class TurmasService {

  constructor(private http: HttpClient) { }

  create(turma) {
    return this.http.post(`${environment.apiUrl}/turmas`, turma);
  }

  update(turma) {
    return this.http.put(`${environment.apiUrl}/turmas`, turma);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/turmas/${id}`);
  }

  getId(id: number): Observable<Turma> {
    return this.http.get<Turma>(`${environment.apiUrl}/turmas/${id}`);
  }

  ordenarTurmas(turmasId: any) {
    return this.http.put(`${environment.apiUrl}/turmas/ordenar`, turmasId);
  }

  getTurmasAno(ano: number): Observable<Turma[]> {
    return this.http.get<Turma[]>(`${environment.apiUrl}/turmas/ano/${ano}`);
  }

  getTurmasAnos():  Observable<number[]> {
    return this.http.get<number[]>(`${environment.apiUrl}/turmas/anos`);
  }

  getTurnos()  {
    const turnos = [
      {label: "Matutino",   value:'m'},
      {label: "Vespertino", value:'v'},
      {label: "Noturno",    value:'n'},
      {label: "Integral",   value:'mv'}
    ];

    return turnos;
  }



}
