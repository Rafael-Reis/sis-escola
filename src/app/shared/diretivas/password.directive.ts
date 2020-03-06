import { Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appPassword]'
})
export class PasswordDirective  {

  constructor(private el: ElementRef) {}

  @HostListener('focus')
  exibir() {
    this.el.nativeElement.setAttribute('type', 'text');
  }
c
  @HostListener('blur')
  ocultar() {
    this.el.nativeElement.setAttribute('type', 'password');
  }

}
