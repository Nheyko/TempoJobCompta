import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringifyState'
})
export class StringifyStatePipe implements PipeTransform {

  transform(value: number): string {

    if(value === 1) {
      return "Brouillon"
    }
    
    if(value === 2) {
      return "En attente"
    }

    if(value === 3) {
      return "Validée"
    }

    if(value === 4) {
      return "Refusée"
    }
    return null;
  }

}
