import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef} from 'primeng/dynamicdialog';
import { Estudante } from './../../estudantes/estudante.model';
import { EstudanteService } from './../../estudantes/estudante.service';

@Component({
  selector: 'app-pesquisar-estudante',
  templateUrl: './pesquisar-estudante.component.html'
})
export class PesquisarEstudanteComponent implements OnInit {
  text: string;
  estudante: Estudante;
  results: any[];

  constructor(
    public dialogDynamic: DynamicDialogRef,
    private estudanteService: EstudanteService) { }

  ngOnInit() { }

  search(event: any) {
    this.estudanteService.search(event.query).subscribe((clientes: any[]) => {
      this.results = clientes;
    });
  }

  selectSearch(data: Estudante) {
    this.estudante = data;
    this.dialogDynamic.close(this.estudante);
  }

}
