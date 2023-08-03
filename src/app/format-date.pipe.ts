import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: Date): string {
    if(value == null)
      return null
    
    const date = value.toString()

    const parsedDate = date.split(/[-T:.]/)

    return parsedDate[2] + "/" + parsedDate[1] + "/" + parsedDate[0] + " " + parsedDate[3] + ":" + parsedDate[4] + ":" + parsedDate[5]
  }
}
