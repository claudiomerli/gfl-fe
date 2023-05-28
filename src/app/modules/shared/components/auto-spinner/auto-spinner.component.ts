import {Component, Input, OnInit} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-auto-spinner',
  templateUrl: './auto-spinner.component.html',
  styleUrls: ['./auto-spinner.component.scss']
})
export class AutoSpinnerComponent implements OnInit{

  @Input() id! : string;
  @Input() color! : string;
  @Input() bgColor! : string;
  @Input() type! : string;
  @Input() size! : any;

  constructor(private ngxSpinner : NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.ngxSpinner.show(this.id)
  }
}
