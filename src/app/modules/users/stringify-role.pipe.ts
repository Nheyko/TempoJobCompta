import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringifyRole'
})
export class StringifyRolePipe implements PipeTransform {

  transform(userRole: number, userCiv: number): string {
    if(userRole == null)
      return null
    if(userRole == 1)
      return "Super admin"
    else if(userRole == 2 && userCiv == 0)
      return "Collaborateur"
    else if(userRole == 2 && userCiv == 1)
      return "Collaboratrice"
    else if(userRole == 3)
      return "Comptable"
    else if(userRole == 4 && userCiv == 0)
      return "Inactif"
    else
      return "Inactive"
  }

}
