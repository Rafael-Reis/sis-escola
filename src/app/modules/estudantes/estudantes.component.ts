import { AcessoService } from './../../auth/acesso.service';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { LazyLoadEvent, SelectableRow } from 'primeng/primeng';
import { ToastService } from './../../shared/components/toast/toast.service';
import { EstudanteService } from './estudante.service';
import { TurmasService } from './../turmas/turmas.service';
import { Estudante } from './estudante.model';
import { Paginacao } from './../../shared/models/paginacao.model';
import { Turma } from '../turmas/turma.model';

import { FormCadastroEstudanteComponent } from './form-cadastro-estudante/form-cadastro-estudante.component';
import { PesquisarEstudanteComponent } from './pesquisar-estudante/pesquisar-estudante.component';

@Component({
  selector: 'app-estudantes',
  templateUrl: './estudantes.component.html',
})
export class EstudantesComponent implements OnInit {
  estudante: Estudante;
  estudantes: Estudante[] = [];
  turma: Turma;
  turmas: Turma[] = [];
  paginacao: Paginacao;

  text: string;
  results: Estudante[];

  currentPage = 0;
  tableLoading = true;

  constructor(
    public acessoService: AcessoService,
    public dialogService: DialogService,
    private turmasService: TurmasService,
    private estudanteService: EstudanteService,
    private toast: ToastService  ) { }

  ngOnInit() {

  }

  loadLazy(event: LazyLoadEvent){
    this.currentPage = 1 + ((event.first !== 0) ? Math.floor(event.first / event.rows) : 0);
    this.turmas.length !== 0 ?  this.getEstudantesTurma() : this.getTurmasAno();
  }

  selectTurma(turma: Turma){
    this.turma = turma;
    this.currentPage = 1;
    this.getEstudantesTurma();
  }

  onRowSelect(event: SelectableRow) {
    this.estudante = event.data;
    this.estudanteService.get(this.estudante.id).subscribe( (estudante: Estudante) => {
      this.estudante = estudante;
      this.showModalFormUpdate();
    });
  }

  getEstudantesTurma(){
    if(this.turma) {

      this.tableLoading = true;

      this.estudanteService.getPage(this.turma.id, this.currentPage).subscribe( (data: any) => {
        this.estudantes = data.estudantes;
        this.paginacao  = data.paginacao;
        this.currentPage = this.paginacao.currentPage;
      }, error => {
        this.tableLoading = false;
        this.toast.showError('Falha na listagem de estudantes!');
      }, () => {
        this.tableLoading = false;
      });
    }
  }

  getTurmasAno(ano = null) {
    if(!ano) {
      ano = new Date().getUTCFullYear();
    }

    return this.turmasService.getTurmasAno(ano).subscribe( (turmas: Turma[]) => {
      this.turmas = turmas;
      this.turma  = this.turmas[0];
      this.getEstudantesTurma();
    });
  }

  recarregarPlanilha() {
    this.getEstudantesTurma();
  }

  exportarPlanilha() {
    this.estudanteService.downloadPlanilhaAlunosPorTurma(this.turma.id, this.turma.nome);
  }

  showModalFormCadastro(){
    const ref = this.dialogService.open(FormCadastroEstudanteComponent, {
      header: 'Cadastrar Estudante',
      styleClass: 'dialog-large dialog-overflow',
      data: {
        turmas: this.turmas,
        turma: this.turma
      },
    });

    ref.onClose.subscribe((estudante: Estudante) => {

      if(estudante && estudante !== undefined ){
        this.estudantes.push(estudante);
      }

    });
  }

  showModalFormUpdate(){
    const ref = this.dialogService.open(FormCadastroEstudanteComponent, {
      header: 'Editar Estudante',
      styleClass: 'dialog-large dialog-overflow',
      data: {
        turmas: this.turmas,
        estudante: this.estudante,
      }
    });

    ref.onClose.subscribe((estudante: Estudante) => {
      if(estudante !== undefined && estudante !== undefined) {

        if(this.estudante.turma.id !== estudante.turma.id){
          this.estudantes.splice(this.estudantes.indexOf(this.estudante), 1);
        } else {
          const i = this.estudantes.indexOf(estudante);

          if(i >= 0 ){
            this.estudantes[i] = estudante;
          }
        }

      }
    });

  }

  showModalSearch(){
    const ref = this.dialogService.open(PesquisarEstudanteComponent, {
      header: 'Procurar Estudante',
      styleClass: 'dialog-medium',
    });

    ref.onClose.subscribe((estudante: Estudante) => {

      if(estudante && estudante !== undefined) {
        this.estudante = estudante;
        this.showModalFormUpdate();
      }

    });

  }

  excluir(estudante: Estudante) {
    if(confirm('Deseja excluir o estudante?')) {
      this.estudanteService.delete(estudante.id).subscribe( message => {
        this.estudantes.splice(this.estudantes.indexOf(estudante), 1);
        this.toast.showSuccess(message);
      });
    }

  }

}
