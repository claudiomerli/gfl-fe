import {Component, EventEmitter, Input, Output} from '@angular/core';

export enum ModalSize {
  DEFAUlT="", SM = "modal-xs", LG = "modal-lg", XL = "modal-xl"
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title = "";
  @Input() size = ModalSize.DEFAUlT;
  @Output('close') closeEmitter: EventEmitter<void> = new EventEmitter<void>();
  show = false;

  open(title?: string) {
    if (title) {
      this.title = title;
    }
    this.show = true;
  }

  close() {
    this.show = false;
    this.closeEmitter.emit();
  }

}
