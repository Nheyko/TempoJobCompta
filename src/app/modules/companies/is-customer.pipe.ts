import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isCustomer'
})
export class IsCustomerPipe implements PipeTransform {

  transform(value: number): string {
    if(value == null)
    return null

    if(value === 0) {
      return "Vendeur"
    }
    else {
      return "Client"
    }
  }

}
