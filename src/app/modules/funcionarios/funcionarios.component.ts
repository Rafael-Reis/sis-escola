import { ToastService } from './../../shared/components/toast/toast.service';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LazyLoadEvent, SelectableRow } from 'primeng/primeng';
import { Paginacao } from './../../shared/models/paginacao.model';
import { Funcionario, FuncionarioPage } from './funcionario.model';
import { FuncionariosService } from './funcionarios.service';
import { FormCadastroFuncionarioComponent } from './form-cadastro-funcionario/form-cadastro-funcionario.component';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
})
export class FuncionariosComponent implements OnInit {
  title = "Funcionários";
  funcionarios: Funcionario[];
  paginacao: Paginacao;

  results: Funcionario[];

  currentPage = 0;
  tableLoading = true;

  constructor(
    private toastService: ToastService,
    private funcionariosService: FuncionariosService,
    private dialogService: DialogService) { }

  ngOnInit() {

  }

  loadLazy(event: LazyLoadEvent){
    this.tableLoading = true;
    this.currentPage = 1 + ((event.first !== 0) ? Math.floor(event.first / event.rows) : 0);
    this.getFuncionarios();
  }


  search(event) {
    this.funcionariosService.search(event.query).subscribe((funcionarios: Funcionario[]) => {
      this.results = funcionarios;
    });
  }

  selectSearch(funcionario: Funcionario) {
    this.showModalFormUpdate(funcionario);
  }

  onRowSelect(event: SelectableRow) {
    this.showModalFormUpdate(event.data);
  }

  getFuncionarios() {
    this.funcionariosService.getPage(this.currentPage)
    .subscribe( (funcionarioPage: FuncionarioPage)=> {
      this.funcionarios = funcionarioPage.funcionarios;
      this.paginacao = funcionarioPage.paginacao;

      this.tableLoading = false;
    });
  }

  showModalFormCadastro() {
    const ref = this.dialogService.open(FormCadastroFuncionarioComponent, {
      header: 'Cadastrar Funcionário',
      styleClass: 'dialog-large dialog-overflow',
      dismissableMask: false,
    });

    ref.onClose.subscribe( (funcionario) => {
      if(funcionario && funcionario !== undefined) {
        this.funcionarios.push(funcionario);
      }
    })
  }

  showModalFormUpdate(data: Funcionario) {
    const ref = this.dialogService.open(FormCadastroFuncionarioComponent, {
      header: 'Editar Funcionário',
      styleClass: 'dialog-large dialog-overflow',
      dismissableMask: false,
      data: {
        funcionario: data
      }
    });

    ref.onClose.subscribe( (funcionario: Funcionario) => {
      if(funcionario && funcionario !== undefined) {
        this.funcionarios[this.funcionarios.indexOf(data)] = funcionario;
      }
    });
  }

  excluir(funcionario: Funcionario) {
    if(confirm('Deseja Excluir este Funcionários')) {
      this.funcionariosService.delete(funcionario.id).subscribe( (data: any) => {
        this.toastService.showSuccess(data.message);
        this.funcionarios.splice(this.funcionarios.indexOf(funcionario), 1);
      }, error => {
        if(error.status === 422) {
          this.toastService.showError(error.error);
        } else {
          this.toastService.showError('Falha na Operação!');
        }
      });
    }
  }

}
