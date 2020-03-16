import { AcessoService } from './../../auth/acesso.service';
import { ToastService } from './../../shared/components/toast/toast.service';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/primeng';
import { DialogService } from 'primeng/dynamicdialog';

import { TurmasService } from './turmas.service';
import { Turma } from './turma.model';

import { FormCadastroTurmaComponent } from './form-cadastro-turma/form-cadastro-turma.component';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html'
})
export class TurmasComponent implements OnInit {
  turmas: Turma[] = [];
  turnos: SelectItem[] = [];

  ano: number;
  anos: SelectItem[] = [];

  cols: any[];
  tableLoading = true;

  constructor(
    public acessoService: AcessoService,
    public dialogService: DialogService,
    private turmasService: TurmasService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.getAnosLetivos();

    this.turnos = this.turmasService.getTurnos();
    this.ano    = new Date().getFullYear();
  }

  loadLazy(event: LazyLoadEvent){
    this.getTurmasPorAnoLetivo(this.ano);
  }

  selectAnoLetivo(event) {
    if(this.ano !== event.value){
      this.ano = event.value;
    }

    this.getTurmasPorAnoLetivo(this.ano);
  }

  onRowSelect(event) {
    const turma = event.data;
    this.showModalFormUpdate(turma);
  }

  getAnosLetivos() {
    this.turmasService.getTurmasAnos().subscribe( (anos: number[]) => {
      anos.forEach( ano => {
        this.anos.push({
          label: ano.toString(),
          value: ano
        });
      });
    });
  }

  getTurmasPorAnoLetivo(ano) {
    this.tableLoading = true;
    this.turmasService.getTurmasAno(parseInt(ano)).subscribe( (turmas: Turma[]) => {
      this.turmas = turmas;
    }, error => {
      this.tableLoading = false;
      this.toastService.showError('Falha na litagem de Turmas');
    }, () => {
      this.tableLoading = false;
    });
  }

  getNomeTurno(turno: string){
    const nome = this.turnos.find( (item) => item.value === turno );
    return nome ? nome.label : '';
  }

  totalEstudante() {
   return this.turmas.map(item => item.total).reduce((prev, value) => prev + value, 0);
  }

  reorderTurmas(event) {
    const turmasId = {
      ids: []
    }

    this.turmas.forEach( (turma: Turma) => turmasId.ids.push(turma.id));

    this.turmasService.ordenarTurmas(turmasId).subscribe( () => {
      this.toastService.showSuccess('Turmas reordenadas');
    });
  }

  showModalFormCadastro(){
    const ref = this.dialogService.open(FormCadastroTurmaComponent, {
      data: {
        anos: this.anos
      },
      header: 'Cadastrar Turma',
      styleClass: 'dialog-medium dialog-overflow'
    });

    ref.onClose.subscribe((data: Turma) => {

      if(data && data !== undefined) {
        this.turmas.push(data);
      }

    });
  }

  showModalFormUpdate(turma: Turma){
    const ref = this.dialogService.open(FormCadastroTurmaComponent, {
      data: {
        anos: this.anos,
        turma: turma
      },
      header: 'Atualizar Turma',
      styleClass: 'dialog-medium dialog-overflow',
    });

    ref.onClose.subscribe((data: Turma) => {

      if(data && data !== undefined){
        this.turmas[this.turmas.indexOf(turma)] = data;
      }

    });
  }


  excluir(turma: Turma) {
    if(confirm("Deseja excluir esse registro?")) {
      this.turmasService.delete(turma.id).subscribe( (message: string) => {
        this.toastService.showSuccess(message);
        this.turmas.splice(this.turmas.indexOf(turma), 1);
      }, error => {
        if(error.status === 422){
          this.toastService.showWarn(error.error);
        } else {
          this.toastService.showWarn('Falha na exclusão!');
        }
      });
    }

  }

}
