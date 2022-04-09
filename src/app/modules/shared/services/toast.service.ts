import {Injectable, TemplateRef} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  toasts: any[] = [];

  // Push new Toasts to array with content and options
  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  showGenericSuccess() {
    const messaggio = 'Operazione effettuata con successo';
    const options = {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true,
      success: true
    };
    this.show(messaggio,options);
  }

  showSuccess(messaggio: string) {
    const options = {
      classname: 'bg-success text-light',
      delay: 2000 ,
      autohide: true,
      success: true
    };
    this.show(messaggio,options);
  }

  showGenericError() {
    const messaggio = 'Si e\' verificato un errore!';
    const options = {
      classname: 'bg-danger text-light',
      delay: 2000 ,
      autohide: true,
      success: false
    };
    this.show(messaggio,options);
  }

  showError(messaggio: string) {
    debugger;
    const options = {
      classname: 'bg-danger text-light',
      // delay: 3000 ,
      // autohide: true,
      success: false
    };
    this.show(messaggio, options);
  }

  showWarning(messaggio: string) {
    const options = {
      classname: 'bg-warning text-dark',
      delay: 3000 ,
      autohide: true,
      success: false
    };
    this.show(messaggio,options);
  }

  showErroreCampiObbligatori() {
    this.showError('Compilare tutti i campi obbligatori')
  }

  // Callback method to remove Toast DOM element from view
  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
