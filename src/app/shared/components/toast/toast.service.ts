import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'/*  */
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  showSuccess(text: any, title: string = 'Sucesso') {
    if(Array.isArray(text)){
      text.forEach(item => this.messageService.add({severity: 'success', summary: title, detail: item}) );
    }else{
      this.messageService.add({ severity:'success', summary: title, detail: text});
    }
  }

  showInfo(text: any, title: string = 'Informação') {
    if(Array.isArray(text)){
      text.forEach(item => this.messageService.add({severity: 'info', summary: title, detail: item}) );
    }else{
      this.messageService.add({ severity:'info', summary: title, detail: text});
    }
  }

  showWarn(text: any, title: string = 'Atenção!') {
    if(Array.isArray(text)){
      text.forEach(item => this.messageService.add({severity: 'warn', summary: title, detail: item}) );
    }else{
      this.messageService.add({ severity:'warn', summary: title, detail: text});
    }
  }

  showError(text: any, title: string = 'Erro') {
    if(Array.isArray(text)){
      text.forEach(item => this.messageService.add({severity: 'error', summary: title, detail: item}) );
    }else{
      this.messageService.add({ severity: 'error', summary: title, detail: text});
    }
  }

  clear() {
    this.messageService.clear('c');
  }
/*
  showAlertConfirm(title: string, text: string = '', callback) {
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary: title, detail: text});
  }

  onConfirm() {
    this.messageService.clear('c');
  }

  onReject() {
    this.messageService.clear('c');
  }
*/

}
