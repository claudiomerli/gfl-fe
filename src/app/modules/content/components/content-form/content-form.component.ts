import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.scss']
})
export class ContentFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
  }

  contentForm = this.formBuilder.group({

  });

  ngOnInit(): void {
  }

}
