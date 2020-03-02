import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import {NgModel, FormControlName} from '@angular/forms'

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styles: [`

    label{
      display: block;
      font-weight: bold;
      margin-bottom: 0.5em;
    }

    .has-error .ng-invalid {
      border: 2px solid #f44336 !important;
    }

    .has-error-text{
      color:#f44336;
      padding: 3px 0px;
      font-size: 11px;
      display: block;
    }

  `]
})
export class FormInputComponent implements OnInit {

  @Input() label: string
  @Input() required: boolean = false
  @Input() errorMessage: string

  input: any

  @ContentChild(NgModel, null) model: NgModel;
  @ContentChild(FormControlName, null) control: FormControlName;

  constructor() { }

  ngOnInit() {

  }

  ngAfterContentInit(){
    this.input = this.model || this.control;
    if(this.input === undefined){
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou formControlName');
    }

  }

  hasSuccess(): boolean{
    return this.input.valid && (this.input.dirty || this.input.touched);
  }

  hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched);
  }
}
