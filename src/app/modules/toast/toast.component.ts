import {Component, TemplateRef} from '@angular/core';
import {ToastService} from "../shared/services/toast.service";

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastComponent {

  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) { return toast.textOrTpl instanceof TemplateRef; }

}
