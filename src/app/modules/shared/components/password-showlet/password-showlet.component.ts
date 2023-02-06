import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-password-showlet',
  templateUrl: './password-showlet.component.html',
  styleUrls: ['./password-showlet.component.scss']
})
export class PasswordShowletComponent implements OnInit {

  @Input() value: string = "";

  get generatedValue() {
    if (this.hide) {
      return this.value.replace(/./g, "*")
    } else {
      return this.value
    }
  }

  hide = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
