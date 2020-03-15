import { AbrirFecharCaixaComponent } from './../../caixa/abrir-fechar-caixa/abrir-fechar-caixa.component';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SelectableRow } from 'primeng/primeng';
import { Paginacao } from '../../../../shared/models/paginacao.model';
import { CaixaService } from '../../caixa/caixa.service';
import { Caixa } from '../../caixa/caixa.model';
import { DialogService } from 'primeng/dynamicdialog';
import { RelatorioVendasComponent } from '../relatorio-vendas/relatorio-vendas.component';
import { OrdensComponent } from '../../ordens/ordens.component';

@Component({
  selector: 'app-relatorio-caixas',
  templateUrl: './relatorio-caixas.component.html'
})
export class RelatorioCaixasComponent implements OnInit {
  caixas: Caixa[];

  currentPage = 1;
  paginacao: Paginacao;

  loadingTable = true;

  constructor(private caixaService: CaixaService, private dialogService: DialogService) { }

  ngOnInit() {

  }

  loadLazy(event: LazyLoadEvent) {
    this.currentPage = 1 + ((event.first != 0) ? Math.floor(event.first / event.rows) : 0);
    this.getPage();
  }

  getPage() {
    this.loadingTable = true;
    this.caixaService.getPage(this.currentPage).subscribe( (data: any) => {
      this.caixas = data.caixas;
      this.paginacao = data.paginacao;
      this.loadingTable = false;
    });
  }

  onRowSelect(event: SelectableRow) {
    const dialog = this.dialogService.open(OrdensComponent, {
      header: 'Vendas do Caixa',
      data: {
        caixaId: event.data.id
      },
      width: '70%',
      styleClass: 'dialog-overflow'
    });
  }

  fecharCaixa(caixa: Caixa) {
    const ref = this.dialogService.open(AbrirFecharCaixaComponent, {
      data: {
        opcao: 'fechar',
        caixaId: caixa.id
      },
      header: 'Fechamento de Caixa',
      width: '400px'
    });

    ref.onClose.subscribe((status: boolean) => {
      if(status) {
        this.getPage();
      }
    });
  }


}
