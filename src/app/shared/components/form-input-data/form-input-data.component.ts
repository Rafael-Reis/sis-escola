import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-form-input-data',
  templateUrl: './form-input-data.component.html'
})
export class FormInputDataComponent implements OnInit {
  dia: number = 0;
  mes: number = 0;
  ano: number = 0;
  anoAtual: number;

  dias: SelectItem[] = [];
  meses: SelectItem[] = [];
  anos: SelectItem[] = [];

  @Input() data?: any;
  @Input() dataString =  false;
  @Input() disabled?: false;
  @Output() selectData: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.initComponent();


  }

  ngOnChanges() {
    this.setDataValue(this.data);
  }

  selectDia(event) {
    this.emitDataValue();
  }

  selectMes(event) {
    this.emitDataValue();
  }

  selectAno(event) {
    this.emitDataValue();
  }

  setDataValue(dt) {
    const data = (dt instanceof Date) ? dt : new Date(dt);

    if(data instanceof Date){
      this.dia = data.getUTCDate();
      this.mes = data.getUTCMonth();
      this.ano = data.getUTCFullYear();
    }
  }


  emitDataValue() {

    if(this.dia > 0 && this.mes >= 0 && this.ano > 0) {

      const data = new Date(this.ano, this.mes, this.dia);

      if(this.dataString === true){
        this.selectData.emit(new DatePipe('pt').transform(data, 'yyyy-MM-dd'));
      }else {
        this.selectData.emit(data);
      }

    }
  }

  listMeses() {
    const meses31 = [1, 3, 5, 7, 8, 10, 12];

    if(this.dia === 31){

      return this.meses.filter( (item) => {
        return meses31.indexOf(item.value) > -1;
      });

    } else if(this.dia === 29){

      return this.meses.filter( (item) => {
        return item.value !== 2;
      });

    }else {

      return this.meses;

    }

  }

  initComponent() {
    this.anoAtual =  Number(new Date().getFullYear());

    for( let i = 1;  i <= 31; i++ ){
      this.dias.push({label: i.toString(), value: i });
    }

    for( let i = this.anoAtual; i >= (this.anoAtual - 50); i-- ) {
      this.anos.push({label: i.toString(), value: i });
    }

    this.meses = [
      {label: 'Janeiro',    value: 0},
      {label: 'Fevereiro',  value: 1},
      {label: 'Março',      value: 2},
      {label: 'Abril',      value: 3},
      {label: 'Maio',       value: 4},
      {label: 'Junho',      value: 5},
      {label: 'Julho',      value: 6},
      {label: 'Agosto',     value: 7},
      {label: 'Setembro',   value: 8},
      {label: 'Outubro',    value: 9},
      {label: 'Novembro',   value: 10},
      {label: 'Dezembro',   value: 11},
    ];
  }


}
