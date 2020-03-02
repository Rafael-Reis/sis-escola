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
  tipo: any;
  tipos: any[];

  estudante: Estudante;
  results: any[];

  constructor(
    public dialogDynamic: DynamicDialogRef,
    private estudanteService: EstudanteService) { }

  ngOnInit() {


  }


  search(event) {
    const query = event.query;

    this.estudanteService.search(query).subscribe((clientes: any[]) => {
      this.results = clientes;
    });

  }

  selectCliente(data) {
    this.estudante = data;
    this.dialogDynamic.close(this.estudante);
  }

  reset(){
    this.text = null;
    this.estudante = null;
  }

}
