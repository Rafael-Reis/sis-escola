import { Turma } from './../../turmas/turma.model';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef} from 'primeng/dynamicdialog';

import { Estudante } from './../../estudantes/estudante.model';
import { EstudanteService } from './../../estudantes/estudante.service';
import { Cliente } from './cliente.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  text: string;
  tipo: any;
  tipos: any[];

  cliente: Cliente;
  results: any[];

  constructor(
    public dialogDynamic: DynamicDialogRef,
    private estudanteService: EstudanteService) { }

  ngOnInit() {

    this.tipo = 'e';

    this.tipos = [
      {label: 'Estudante', value: 'e'},
      {label: 'Funcionário', value: 'f'}
    ];

  }

  ngOnDestroy() {
    this.clear();
  }

  search(event) {
    const query = event.query;

    if(this.tipo === 'e'){

      this.estudanteService.search(query).subscribe((estudantes: Estudante[]) => {
        this.results = estudantes;
      });

    } else if(this.tipo === 'f'){

      // this.funcionariosService.search(query).subscribe((clientes: any[]) => {
      //   this.results = clientes;
      // });

    }

  }

  selectCliente(data) {
    if(data !== undefined && data.hasOwnProperty('id') && data.hasOwnProperty('nome')) {

      this.cliente = {
        id   : data.id,
        tipo : this.tipo,
        nome : data.nome,
        funcao : this.tipo === 'e' ? 'Estudante' : 'Funcionário',
      };

      this.dialogDynamic.close(this.cliente);

    } else {
      this.dialogDynamic.close();
    }
  }


  clear(){
    this.text = null;
    this.cliente = null;
  }

}
