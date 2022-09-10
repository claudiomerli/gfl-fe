import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidemenu-item',
  templateUrl: './sidemenu-item.component.html',
  styleUrls: ['./sidemenu-item.component.scss']
})
export class SidemenuItemComponent implements OnInit {
  @Input() icon!: string;
  @Input() title!: string;
  @Input() indent = false

  constructor() {
  }

  ngOnInit(): void {
  }

}
