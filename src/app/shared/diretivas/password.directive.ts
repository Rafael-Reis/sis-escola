import { Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appPassword]'
})
export class PasswordDirective  {

  constructor(private el: ElementRef) {}

  @HostListener('focus', ['$event'])
  exibir(event) {
    console.log('passou')
    this.el.nativeElement.setAttribute('type', 'text');
  }

  @HostListener('blur', ['$event'])
  ocultar() {
    this.el.nativeElement.setAttribute('type', 'password');
  }

}
