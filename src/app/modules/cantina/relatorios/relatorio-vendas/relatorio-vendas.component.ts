import { OrdensService } from './../../ordens/ordens.service';
import { LazyLoadEvent } from 'primeng/primeng';
import { Paginacao } from './../../../../shared/models/paginacao.model';
import { CaixaService } from './../../caixa/caixa.service';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Ordem } from './../../ordens/ordem.model';
import { Component, OnInit, Input } from '@angular/core';
import { Caixa } from '../../caixa/caixa.model';

export interface RelatorioCaixa {
  caixa: Caixa;
  ordens: Ordem[];
}

@Component({
  selector: 'app-relatorio-vendas',
  templateUrl: './relatorio-vendas.component.html'
})
export class RelatorioVendasComponent implements OnInit {
  ordens: Ordem[] = [];

  @Input() caixa: Caixa;

  cols: any[];
  currentPage = 1;
  paginacao: Paginacao;
  loadingTable = true;

  constructor(private ordensService: OrdensService, public dialogConfig: DynamicDialogConfig ) { }

  ngOnInit() {

    this.cols = [
      { field: 'id', header: '', width: '45px' },
      { field: 'created', header: 'Data', width: '' },
      { field: 'pagamento', header: 'Pagamento', width: '' },
      { field: 'total', header: 'Total', width: '' },
    ];


    console.log(this.dialogConfig.data)

    if(this.dialogConfig.data && this.dialogConfig.data.hasOwnProperty('caixa')) {
      this.caixa = this.dialogConfig.data.caixa;
    }


  }


  loadLazy(event: LazyLoadEvent) {
    this.currentPage = 1 + ((event.first !== 0) ? Math.floor(event.first / event.rows) : 0);

    this.loadingTable = true;
    this.ordensService.getOrdensPageCaixa(this.currentPage, this.caixa.id)
    .subscribe( (data: any) => {
      this.ordens = data.ordens;
      this.paginacao = data.paginacao;

      this.loadingTable = false;
    });
  }




}
