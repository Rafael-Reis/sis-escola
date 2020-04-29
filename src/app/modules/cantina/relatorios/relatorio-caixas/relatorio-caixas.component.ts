import { ToastService } from './../../../../shared/components/toast/toast.service';
import { SelectItem } from 'primeng/api';
import { AbrirFecharCaixaComponent } from './../../caixa/abrir-fechar-caixa/abrir-fechar-caixa.component';
import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent, SelectableRow } from 'primeng/primeng';
import { Paginacao } from '../../../../shared/models/paginacao.model';
import { CaixaService } from '../../caixa/caixa.service';
import { Caixa } from '../../caixa/caixa.model';
import { DialogService } from 'primeng/dynamicdialog';
import { OrdensComponent } from '../../ordens/ordens.component';

@Component({
  selector: 'app-relatorio-caixas',
  templateUrl: './relatorio-caixas.component.html'
})
export class RelatorioCaixasComponent implements OnInit {
  caixas: Caixa[];
  mes: number;
  meses: SelectItem[];

  currentPage = 1;
  paginacao: Paginacao;
  loadingTable = true;

  constructor(
    private toastService: ToastService,
    private caixaService: CaixaService,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.setValues();

  }

  setValues() {
    this.mes = new Date().getUTCMonth();

    this.meses = [
      {label: 'Janeiro',    value: 0},
      {label: 'Fevereiro',  value: 1},
      {label: 'Março',      value: 2},
      {label: 'Abril',      value: 3},
      {label: 'Maio',       value: 4},
      {label: 'Junho',      value: 5},
      {label: 'Julho',      value: 6},
      {label: 'Agosto',     value: 7},
      {label: 'Setembro',   value: 8},
      {label: 'Outubro',    value: 9},
      {label: 'Novembro',   value: 10},
      {label: 'Dezembro',   value: 11},
    ];
  }

  loadLazy(event: LazyLoadEvent) {
    this.currentPage = 1 + ((event.first !== 0) ? Math.floor(event.first / event.rows) : 0);
    this.getCaixaMes();
  }

  getCaixaMes() {
    this.loadingTable = true;
    this.caixaService.getCaixasPorMes(this.mes, this.currentPage).subscribe( (data: any) => {
      this.caixas = data.caixas;
      this.paginacao = data.paginacao;
    }, error => {
      this.toastService.showError('Falha na listagem dos Caixas!');
    }, () => {
      this.loadingTable = false;
    });
  }

  onRowSelect(event: SelectableRow) {
    const dialog = this.dialogService.open(OrdensComponent, {
      header: 'Vendas do Caixa',
      data: {
        caixaId: event.data.id
      },
      styleClass: 'dialog-large dialog-overflow'
    });
  }

  selectMes(mes) {
    this.mes = mes;
    this.getCaixaMes();
  }

  fecharCaixa(caixa: Caixa) {
    const ref = this.dialogService.open(AbrirFecharCaixaComponent, {
      data: {
        opcao: 'fechar',
        caixaId: caixa.id
      },
      header: 'Fechamento de Caixa',
      styleClass: 'dialog-medium'
    });

    ref.onClose.subscribe((status: boolean) => {
      if(status) {
        this.getCaixaMes();
      }
    });
  }


}
