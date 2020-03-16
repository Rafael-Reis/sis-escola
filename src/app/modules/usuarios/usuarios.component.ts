import { AcessoService } from './../../auth/acesso.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from './../../shared/components/toast/toast.service';
import { LazyLoadEvent } from 'primeng/primeng';
import { Paginacao } from './../../shared/models/paginacao.model';
import { UsuariosService } from './usuarios.service';
import { DialogService } from 'primeng/dynamicdialog';
import { FormCadastroUsuariosComponent } from './form-cadastro-usuarios/form-cadastro-usuarios.component';
import { User } from './user.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html'
})
export class UsuariosComponent implements OnInit {
  users: User[] = [];
  paginacao: Paginacao;
  niveis: any[] = [];
  results: User[] = [];

  currentPage = 0;
  tableLoading = true;

  constructor(
    private dialogService: DialogService,
    private usuariosService: UsuariosService,
    private toastService: ToastService,
    public acessoService: AcessoService) { }

  ngOnInit() {

  }

  loadLazy(event: LazyLoadEvent){
    this.currentPage = 1 + ((event.first !== 0) ? Math.floor(event.first / event.rows) : 0);

    this.tableLoading = true;

    this.usuariosService.getPage(this.currentPage).subscribe( (data: any) => {
      this.users = data.users;
      this.paginacao = data.paginacao;
    }, error => {
      this.toastService.showError('Falha na operação!');
    }, () => {
      this.tableLoading = false;
    });
  }

  onRowSelect(event: any) {
    this.showModalFormUpdate(event.data);
  }

  search(event: any) {
    const query = event.query;
    this.usuariosService.search(query).subscribe((user: User[]) => {
      this.results = user;
    }, error => {
      this.toastService.showError('Falha na operação!');
    });
  }

  selectSearchUsuario(user: User) {
    this.showModalFormUpdate(user);
  }

  showModalFormCadastro() {
    const ref = this.dialogService.open(FormCadastroUsuariosComponent, {
      header: 'Cadastrar Usuário',
      styleClass: 'dialog-medium',
    });

    ref.onClose.subscribe((user: User) => {
      if(user !== undefined && user !== null ){
        this.users.push(user);
      }
    });
  }

  showModalFormUpdate(user: User) {
    const ref = this.dialogService.open(FormCadastroUsuariosComponent, {
      header: 'Atualizar Usuário',
      styleClass: 'dialog-medium',
      data: {
        user: user
      }
    });

    ref.onClose.subscribe((user: User) => {

      if(user !== undefined && user !== null ){
        this.users[this.users.indexOf(user)] = user;
      }

    });
  }

  excluir(user: User){
    if(confirm('Deseja excluir o estudante?')) {
      this.usuariosService.delete(user.id).subscribe( message => {
        this.users.splice(this.users.indexOf(user), 1);
        this.toastService.showSuccess(message);
      }, error => {
        if(error.status === 422) {
          this.toastService.showWarn(error.error);
        }
      });
    }
  }


}
