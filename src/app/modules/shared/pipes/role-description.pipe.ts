import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'roleDescription'
})
export class RoleDescriptionPipe implements PipeTransform {

  transform(value: string | undefined): string {
    switch (value) {
      case "ADMIN":
        return "Admin";
      case "CHIEF_EDITOR":
        return "Capo Editor";
      case "EDITOR":
        return "Editor"
      case "CUSTOMER":
        return "Cliente"
      case "PUBLISHER":
        return "Pubblicatore"
      case "ADMINISTRATION":
        return "Amministrazione fatturazione"
    }

    return "Sconosciuto";
  }

}
