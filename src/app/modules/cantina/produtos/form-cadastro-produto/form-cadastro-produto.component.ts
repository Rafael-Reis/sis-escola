import { AcessoService } from './../../../../auth/acesso.service';
import { Produto, CategoriaProduto } from './../produto.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig , DynamicDialogRef} from 'primeng/dynamicdialog';

import { ToastService } from './../../../../shared/components/toast/toast.service';
import { ProdutosService } from './../produtos.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-form-cadastro-produto',
  templateUrl: './form-cadastro-produto.component.html'
})
export class FormCadastroProdutoComponent implements OnInit {
  produtoForm: FormGroup;
  produto: Produto;

  categoriasSelect: SelectItem[] = [];
  ilimitado = false;

  constructor(
    public acessoService: AcessoService,
    private fb: FormBuilder,
    public dialogService: DialogService,
    public dialogConfig: DynamicDialogConfig,
    public dialogDynamic: DynamicDialogRef,
    private produtosService: ProdutosService,
    private toastService: ToastService) { }

  ngOnInit() {

    this.loadCategoriaas();

    this.createForm();

    if(this.dialogConfig.data && this.dialogConfig.data.hasOwnProperty('produto')) {
      this.produto = this.dialogConfig.data.produto;

      if(this.produto.estoque === -1){
        this.ilimitado = true;
      }

      this.setValueForm(this.produto);

    }

    if(this.acessoService.isNegado()) {
      this.produtoForm.disable();
    }

  }

  createForm() {
    this.produtoForm = this.fb.group({
      id:         [''],
      nome:       ['', Validators.required],
      preco:      ['', Validators.required],
      estoque:    [''],
      validade:   [''],
      categoriaId:['', Validators.required]
    });
  }

  setValueForm(produto: Produto) {
    this.produtoForm.patchValue({
      id:           produto.id,
      nome:         produto.nome,
      preco:        produto.preco,
      estoque:      produto.estoque !== -1 ? this.produto.estoque : null,
      vencimento:   produto.vencimento,
      categoriaId:  produto.categoria.id
    });
  }

  loadCategoriaas() {
    this.produtosService.getCategorias().subscribe((categorias: CategoriaProduto[]) => {
      categorias.forEach(cat => {
        this.categoriasSelect.push({label: cat.nome, value: cat.id})
       });
    }, error => {
      this.toastService.showError('Falha na listagem das categorias!');
    });
  }

  semLimite() {
    if(this.ilimitado) {
      this.ilimitado = false;
      this.produtoForm.get('estoque').enable();
    } else {
      this.ilimitado = true;
      this.produtoForm.get('estoque').reset();
      this.produtoForm.get('estoque').disable();
    }
  }

  validarDataString(dataText) {

    if(dataText.length === 10 && dataText.indexOf('/') !== -1 && dataText.split('/').length === 3){
      let data = new Date(dataText.split('/')[2] , dataText.split('/')[1], dataText.split('/')[0]);

      return !isNaN(data.getTime());

    }

  }

  formSubmit() {

    if(this.produtoForm.valid) {
      let request = null;

      if(this.produto){
        request = this.produtosService.update(this.produtoForm.value);
      } else {
        request = this.produtosService.create(this.produtoForm.value);
      }

      request.subscribe( (msg) => {
        this.toastService.showSuccess(msg);
        this.dialogDynamic.close(this.produtoForm.value);
      }, error => {
        if(error.status === 422) {
          this.toastService.showWarn(Object.values(error.error));
        }else{
          this.toastService.showError("Falha da operação!");
        }
      });

    } else {

      Object.keys(this.produtoForm.controls).forEach(field => {
        this.produtoForm.get(field).markAsTouched({ onlySelf: true });
      });

    }

  }

}
