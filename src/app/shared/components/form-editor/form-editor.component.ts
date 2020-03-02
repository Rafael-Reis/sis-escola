import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-form-editor',
  templateUrl: './form-editor.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormEditorComponent),
      multi: true
    }
  ]
})
export class FormEditorComponent implements ControlValueAccessor {

  constructor() { }

  onChange: any = () => {}
  onTouch: any = () => {}

  val = "";

  set value(value: any){
    if( value !== null){
      this.val = value
      this.onChange(value)
      this.onTouch(value)
    }
  }
  get value() {
    return this.val;
  }

  writeValue(value: any){
    this.val = value
  }

  registerOnChange(fn: any){
    this.onChange = fn
  }

  registerOnTouched(fn: any){
    this.onTouch = fn
  }

}
