import { SelectItem } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html'
})
export class ConfiguracoesComponent implements OnInit {

  configForm: FormGroup;

  selectPorPagina: SelectItem[] = [];
  selectTempoToken: SelectItem[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.createForm();
    this.setValuesSelect();


  }

  createForm() {

    this.configForm = this.fb.group({
      porPagina: [''],
      tempoToken: ['']
    });

  }

  setValuesSelect() {
    for(let i = 1; i <= 5;  i++) {
      this.selectPorPagina.push({label: (i * 5).toString(), value: (i * 5)});
    }

    for(let i = 1; i <= 4;  i++) {
      this.selectTempoToken.push({label: (i * 30) + ' min', value: (i * 30)});
    }
  }

}
