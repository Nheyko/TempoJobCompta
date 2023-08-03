import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringifyGender'
})
export class StringifyGenderPipe implements PipeTransform {

  transform(value: number): string {
    if(value == null)
      return null
    if(value == 0)
      return "Mr."
    else
      return "Mme."
  }

}
