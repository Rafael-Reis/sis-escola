import { ToastService } from './../../../shared/components/toast/toast.service';
import { ParametrosConfiguracoes, Configuracoes } from './configuracoes.model';
import { ConfiguracoesService } from './configuracoes.service';
import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html'
})
export class ConfiguracoesComponent implements OnInit {

  configForm: FormGroup;

  optionsItensPorPagina: SelectItem[] = [];
  optionsTempoAtividade: SelectItem[] = [];

  constructor(private fb: FormBuilder, private toastService: ToastService,  private configuracoesService: ConfiguracoesService) { }

  ngOnInit() {

    this.createForm();
    this.setValuesSelect();
    this.loadConfiguracoes();

  }

  createForm() {

    this.configForm = this.fb.group({
      itensPorPagina: ['', Validators.required],
      tempoAtividade: ['', Validators.required]
    });

  }

  loadConfiguracoes() {
    this.configuracoesService.getConfiguracoes().subscribe( (config: Configuracoes) => {
      console.log(config)
      this.configForm.patchValue({
        itensPorPagina: config.itensPorPagina,
        tempoAtividade: config.tempoAtividade
      });
    });
  }

  setValuesSelect() {
    this.configuracoesService.getParametros().subscribe((parametros: ParametrosConfiguracoes) => {

      parametros.itensPorPagina.forEach( item => {
        this.optionsItensPorPagina.push({label: item.toString(), value: item });
      });

      parametros.tempoAtividade.forEach( item => {
        this.optionsTempoAtividade.push({label: item.toString(), value: item });
      });


    });

  }

  formSubmit() {
    if(this.configForm.valid) {
      this.configuracoesService.update(this.configForm.value).subscribe((data: any) => {
        this.toastService.showSuccess(data.message);
      }, error => {
        this.toastService.showError("Falha na operação!");
      });
    } else {
      this.toastService.showWarn("Formulário Inválido!");
    }
  }

}
