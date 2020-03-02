import { SelectItem } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/primeng';
import { Paginacao } from './../../../shared/models/paginacao.model';
import { Ordem } from './../../cantina/ordens/ordem.model';
import { Component, OnInit, Input } from '@angular/core';
import { EstudanteService } from './../estudante.service';

@Component({
  selector: 'app-compras-cantina',
  templateUrl: './compras-cantina.component.html'
})
export class ComprasCantinaComponent implements OnInit {
  ordens: Ordem[] = [];
  mes: number;
  meses: SelectItem[];

  cols: any[];
  currentPage = 1;
  paginacao: Paginacao;
  loadingTable = true;

  @Input() estudanteId?: number;

  constructor(private estudanteService: EstudanteService) { }

  ngOnInit() {

    this.mes = new Date().getMonth() + 1;

    this.cols = [
      { field: 'id', header: '', width: '45px' },
      { field: 'created', header: 'Data', width: '' },
      { field: 'pagamento', header: 'Pagamento', width: '' },
      { field: 'total', header: 'Total', width: '' },
    ];

    this.meses = [
      {label: 'Janeiro',    value: 1},
      {label: 'Fevereiro',  value: 2},
      {label: 'Março',      value: 3},
      {label: 'Abril',      value: 4},
      {label: 'Maio',       value: 5},
      {label: 'Junho',      value: 6},
      {label: 'Julho',      value: 7},
      {label: 'Agosto',     value: 8},
      {label: 'Setembro',   value: 9},
      {label: 'Outubro',    value: 10},
      {label: 'Novembro',   value: 11},
      {label: 'Dezembro',   value: 12},
    ];

    this.getComprasMes();

  }

  loadLazy(event: LazyLoadEvent) {
    this.currentPage = 1 + ((event.first !== 0) ? Math.floor(event.first / event.rows) : 0);
    this.getComprasMes();
  }

  selectMes(event: SelectItem) {
    this.getComprasMes();
  }

  getComprasMes() {
    if( Number.isInteger(this.mes) && Number.isInteger(this.estudanteId) ) {

      this.loadingTable = true;

      this.estudanteService.getComprasCantina(this.estudanteId, this.mes)
      .subscribe( (data: any) => {
        this.ordens = data.ordens;
        this.paginacao = data.paginacao;
        this.loadingTable = false;
      });

    }
  }

}
