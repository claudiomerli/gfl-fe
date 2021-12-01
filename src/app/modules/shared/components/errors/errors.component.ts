import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.css']
})
export class ErrorsComponent implements OnInit {

  @Input() control: AbstractControl | undefined;
  @Input() controlName: string | undefined;
  @Input() formSubmitted: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  get customValidatorMessage(): string | undefined {
    if(this.control && this.controlName && this.control.errors) {
      return this.control.errors[this.controlName]?.messaggio;
    }
    return undefined;
  }

  show(): boolean | undefined {
    return (this.formSubmitted && this.control?.invalid) || !this.control?.pending &&
      !this.control?.valid &&
      (this.control?.touched || this.control?.dirty);
  }






}
