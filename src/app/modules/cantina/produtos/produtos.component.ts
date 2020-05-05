import { AcessoService } from './../../../auth/acesso.service';
import { SelectItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LazyLoadEvent } from 'primeng/primeng';

import { ToastService } from './../../../shared/components/toast/toast.service';

import { Paginacao } from './../../../shared/models/paginacao.model';
import { Produto, CategoriaProduto } from './produto.model';
import { ProdutosService } from './../produtos/produtos.service';

import { FormCadastroProdutoComponent } from './form-cadastro-produto/form-cadastro-produto.component';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  entryComponents: [FormCadastroProdutoComponent],
  providers: [DialogService]
})
export class ProdutosComponent implements OnInit {
  categorias: any[];
  produtos: Produto[];
  results:  Produto[];
  paginacao: Paginacao;

  currentPage = 0;
  loadingTable = true;

  constructor(
    public acessoService: AcessoService,
    public dialogService: DialogService,
    private toast: ToastService,
    private produtosService: ProdutosService) { }

  ngOnInit() {

    this.produtosService.getCategorias().subscribe( (categorias: CategoriaProduto[]) =>{
      this.categorias = categorias;
    });

  }

  loadLazy(event: LazyLoadEvent){
    this.loadingTable = true;
    this.currentPage = 1 + ((event.first !== 0) ? Math.floor(event.first / event.rows) : 0);

    this.produtosService.getPage(this.currentPage).subscribe( (data: any) => {
      this.produtos     = data.produtos;
      this.paginacao    = data.paginacao;
      this.currentPage  = this.paginacao.currentPage;
    }, error => {
      this.loadingTable = false;
      this.toast.showError('Falha na listagem de produtos!');
    }, () => {
      this.loadingTable = false;
    });
  }

  search(event: any) {
    const query = event.query;
    this.produtosService.search(query).subscribe((produtos: Produto[]) => {
      this.results = produtos;
    });
  }

  selectProduto(produto: Produto) {
    this.results = [];
    this.showModalFormUpdate(produto);
  }

  onRowSelect(event) {
    const produto = event.data;
    this.showModalFormUpdate(produto);
  }

  showModalFormCadastro() {
    const ref = this.dialogService.open(FormCadastroProdutoComponent, {
      data: {},
      header: 'Cadastrar Produto',
      styleClass: 'dialog-medium',
      dismissableMask: false,
    });

    ref.onClose.subscribe((produto: Produto) => {
      if(produto !== undefined){
        this.produtos.push(produto);
      }
      console.log(produto)
    });
  }

  showModalFormUpdate(produto: Produto) {
    const ref = this.dialogService.open(FormCadastroProdutoComponent, {
      data: {
        produto: produto,
        categorias: this.categorias
      },
      header: 'Editar Produto',
      styleClass: 'dialog-medium',
    });

    ref.onClose.subscribe((data: Produto) => {

      const i = this.produtos.indexOf(produto);
      if(data !== undefined && i !== -1){
        this.produtos[i] = data;
      }

    });
  }

  excluirProduto(produto: Produto) {
    if(confirm("Deseja excluir este produto?")) {

      this.produtosService.delete(produto.id).subscribe( (message) => {
        this.toast.showSuccess(message);
      }, error => {
        if(error.status === 422) {
          this.toast.showWarn(error.error);
        } else {
          this.toast.showError('Falha na Exclusão!');
        }
      });

    }
  }

}
