import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleDescription'
})
export class RoleDescriptionPipe implements PipeTransform {

  transform(value: "ADMIN" | "CHIEF_EDITOR" | "EDITOR" | undefined): string {
    switch (value){
      case "ADMIN": return "Admin";
      case "CHIEF_EDITOR": return "Capo Editor";
      case "EDITOR": return "Editor"
    }

    return "Sconosciuto";
  }

}
