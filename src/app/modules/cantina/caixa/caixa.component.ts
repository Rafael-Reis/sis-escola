import { Caixa } from './caixa.model';
import { OrdensComponent } from './../ordens/ordens.component';
import { AbrirFecharCaixaComponent } from './abrir-fechar-caixa/abrir-fechar-caixa.component';
import { ToastService } from './../../../shared/components/toast/toast.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { LazyLoadEvent, SelectableRow } from 'primeng/primeng';
import { DialogService } from 'primeng/dynamicdialog';
import { ClientesComponent } from './../clientes/clientes.component';
import { Produto } from './../produtos/produto.model';
import { ProdutosService } from './../produtos/produtos.service';
import { Paginacao } from './../../../shared/models/paginacao.model';
import { Ordem } from './../ordens/ordem.model';
import { OrdensService } from '../ordens/ordens.service';
import { Cliente } from '../clientes/cliente.model';
import { CaixaService } from './caixa.service';


@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.scss']

})
export class CaixaComponent implements OnInit {
  caixa: Caixa;
  cliente: Cliente;
  pagamento: string;
  produtos: Produto[] = [];
  formasDePagamento: any[];
  dinheiro = 0;

  submit = false;
  verificado = false;

  cols: any[];
  loadingTable = true;
  currentPage =  1;
  paginacao: Paginacao;
  hoje = new Date();

  constructor(
    private caixaService: CaixaService,
    private toastService: ToastService,
    private produtosService: ProdutosService,
    private ordensService: OrdensService,
    private dialogService: DialogService) { }

  ngOnInit() {



    this.isCaixaAberto();

    this.cols = [
      { field: 'nome', header: 'Nome', width: '' },
      { field: 'preco', header: 'Preço', width: '100px' },
      { field: 'id',   header: '',     width: '60px' },
    ];

    this.formasDePagamento = [
      {label:'A Vista', value:'vista', icon:'icon-money', command: (event) => {
        this.pagamento = event.value;
        this.cliente = null;
      }},
      {label:'Fiado', value:'prazo', icon:'icon-note', command: (event) => {
        this.pagamento = event.value;
        this.showModalClientes();
      }}
    ];

  }

  @HostListener('window:keydown', ['$event'])
  keydown(event: KeyboardEvent) {
    //console.log(event)

    switch(event.keyCode) {
      //Enter
      case 13:
          this.confirmar();
        break;
      //Esc
      case 27:
          this.cancelar();
        break;
    }
  }

  ngOnDestroy() {
    this.clear();
  }

  /**
   * Verifica se o Caixa está aberto para a data atual
   */
  isCaixaAberto() {
    this.caixaService.getCaixaAberto().subscribe( (caixa: Caixa) => {
      this.caixa = caixa;
      this.verificado = true;
    });
  }

  loadLazy(event: LazyLoadEvent){
    this.currentPage = 1 + ((event.first !== 0) ? Math.floor(event.first / event.rows) : 0);

    this.produtosService.getPage(this.currentPage).subscribe( (data: any) => {
      this.produtos     = data.produtos;
      this.paginacao    = data.paginacao;
      this.currentPage  = this.paginacao.currentPage;
      this.loadingTable = false;
    });
  }

  onRowSelect(event: SelectableRow) {
    this.addItem(event.data);
  }

  hasValid() {
    if(this.pagamento === 'vista' && this.ordensService.hasItens()) {
      return true;
    } else if(this.cliente && (this.pagamento === 'vista' || this.pagamento === 'prazo')  && this.ordensService.hasItens()){
      return true;
    } else {
      return false;
    }
  }

  hasItens() {
    return this.ordensService.hasItens();
  }

  addItem(produto: Produto) {
    this.ordensService.addItem(produto);
  }

  troco() {
    return this.dinheiro > 0 ? this.dinheiro - this.total() : 0 ;
  }

  total() {
    return this.ordensService.total();
  }

  confirmar() {
    if(this.hasValid() ) {
      this.submit = true;

      const ordem = new Ordem(this.cliente, this.pagamento, this.ordensService.itens());
      // console.log(ordem)
      this.ordensService.finalizarOrdem(ordem).subscribe( (data: any) => {
        this.toastService.showSuccess("Venda Realizada");
        this.clear();
      }, error => {
        this.toastService.showError("Falha na operação");
        this.submit = false;
      }, () => {
        this.submit = false;
      });
    }
  }

  cancelar() {
    if(this.ordensService.hasItens() ){
      const confirmar = confirm("Deseja Cancelar essa Venda?");

      if(confirmar) {
        this.clear();
        this.toastService.showInfo("Compra Cancelada");
      }
    }
  }

  clear() {
    this.dinheiro  = 0;
    this.cliente   = null;
    this.pagamento = null;
    this.ordensService.clear();
  }

  showModalClientes() {
    const ref = this.dialogService.open(ClientesComponent, {
      header: 'Selecionar Cliente',
      width: '70%'
    });

    ref.onClose.subscribe((cliente: any) => {
      if(cliente !== null && cliente !== undefined) {
        this.cliente = cliente;
      }else {
        this.pagamento = null;
      }
    });
  }

  showModalHistorico() {
  //  this.displayHitorico = true;
    const ref = this.dialogService.open(OrdensComponent, {
      data: {
        caixaId: this.caixa.id,
        cancelamento: true
      },
      header: 'Histórico',
      styleClass: 'dialog-large dialog-overflow'
    });

    ref.onClose.subscribe((data: any) => {

    });
  }

  showModalAbrirCaixa() {
    const ref = this.dialogService.open(AbrirFecharCaixaComponent, {
      data: {
        opcao: 'abrir'
      },
      header: 'Abertura de Caixa',
      styleClass: 'dialog-medium'

    });

    ref.onClose.subscribe((caixa: Caixa) => {
      this.caixa = caixa;
    });
  }

  showModalFecharCaixa() {
    const ref = this.dialogService.open(AbrirFecharCaixaComponent, {
      data: {
        opcao: 'fechar'
      },
      header: 'Fechamento de Caixa',
      styleClass: 'dialog-medium'
    });

    ref.onClose.subscribe((status: boolean) => {
      //Caixa fechado
      if(status){
        this.caixa = null;
      }

    });
  }


}
