import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor() { }

  //dia/mes/ano => ano-mes-dia
  formatDataEn(data: string){
    return new Promise( (resolve, reject) => {
      if(typeof data === 'string'){
        let dt = data.split('/');
        let newDt = dt[2] + '-' + dt[1] + '-' + dt[0] ;

        resolve(newDt);
      }
    });
  }

  formatDataBr(data: Date){
    return new Promise( (resolve, reject) => {
      let day:any   = data.getUTCDate();
      let month:any = data.getUTCMonth() + 1;
      let year:any  = data.getUTCFullYear();

      if(day <= 9){
        day = "0" + day;
      }

      if(month <= 9){
        month = "0" + month;
      }

      let dataStringBr = day + '/' +  month + '/' + year;

      resolve(dataStringBr);
    });
  }



}
