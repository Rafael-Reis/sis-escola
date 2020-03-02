import { OrdemItem } from './ordem.model';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ToastService } from './../../../shared/components/toast/toast.service';
import { Component, OnInit, Input } from '@angular/core';
import { LazyLoadEvent } from 'primeng/primeng';
import { Ordem } from './../ordens/ordem.model';
import { OrdensService } from './../ordens/ordens.service';
import { Paginacao } from './../../../shared/models/paginacao.model';


@Component({
  selector: 'app-ordens',
  templateUrl: './ordens.component.html'
})
export class OrdensComponent implements OnInit {
  ordem: Ordem;
  ordens: OrdemItem[];
  paginacao: Paginacao;

  @Input() caixaId?: number;
  @Input() cancelamento?: boolean; //Habilita Cancelamento

  cols: any[];
  currentPage = 0;
  loadingTable = true;

  constructor(
    private ordensService: OrdensService,
    private dialogConfig: DynamicDialogConfig,
    private toastService: ToastService) { }

  ngOnInit() {

    this.cols = [
      { field: 'id', header: '', width: '45px' },
      { field: 'created', header: 'Data', width: '150px' },
      { field: 'cliente.nome', header: 'Cliente', width: '' },
      { field: 'ordem.user.name', header: 'Operador', width: '' },
      { field: 'pagamento', header: 'Pagamento', width: '100px' },
      { field: 'total', header: 'Total', width: '' },
    ];

    if(this.dialogConfig.data && this.dialogConfig.data.hasOwnProperty('caixaId')) {
      if(this.dialogConfig.data.hasOwnProperty('caixaId')) {
        this.caixaId = this.dialogConfig.data.caixaId;
      }

      if(this.dialogConfig.data.hasOwnProperty('cancelamento')) {
        this.cancelamento = this.dialogConfig.data.cancelamento;
      }
    }

    if(this.cancelamento) {
      this.cols.push({field: '', header: '', width: '55px'})
    }

  }

  loadLazy(event: LazyLoadEvent) {
    this.currentPage = 1 + ((event.first !== 0) ? Math.floor(event.first / event.rows) : 0);

    if(this.caixaId) {
      this.getOrdensCaixa();
    } else {
      this.getOrdensPage();
    }
  }


  primeiroNome(text: string) {
    const nome = text.split(' ');
    return nome.length >= 1 ? nome[0] : '';
  }

  cancelarOrdem(ordemItem: OrdemItem) {
    if(confirm('Deseja Cancelar essa Ordem?')) {
      this.ordensService.cancelarOrdem(ordemItem.id).subscribe( (ordemItem: OrdemItem) => {
        this.ordens[this.ordens.indexOf(ordemItem)] = ordemItem;
        this.toastService.showSuccess('Ordem Cancelada');
      });
    }
  }


  getOrdensPage() {
    this.loadingTable = true;

    this.ordensService.getOrdensPage(this.currentPage).subscribe( (data: any) => {
      this.ordens = data.ordens;
      this.paginacao = data.paginacao;
    }, error => {
      this.toastService.showError('Falha na listagem da ordens!');
    }, () => {
      this.loadingTable = false;
    });
  }


  getOrdensCaixa() {
    this.loadingTable = true;

    this.ordensService.getOrdensPageCaixa(this.currentPage, this.caixaId).subscribe( (data: any) => {
      this.ordens = data.ordens;
      this.paginacao = data.paginacao;
      this.loadingTable = false;
    }, error => {
      this.toastService.showError('Falha na listagem da ordens!');
    }, () => {
      this.loadingTable = false;
    });
  }



}
