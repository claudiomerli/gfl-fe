import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {SaveNewspaperDto} from "../../../shared/messages/newspaper/save-newspaper.dto";

@Component({
  selector: 'app-newspaper-create',
  templateUrl: './newspaper-create.component.html',
  styleUrls: ['./newspaper-create.component.scss']
})
export class NewspaperCreateComponent implements OnInit {

  onSaving = false;

  constructor(private newspaperService: NewspaperService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit($event: SaveNewspaperDto) {
    this.onSaving = true
    this.newspaperService.save($event).subscribe(() => {
      this.onSaving = false
      this.router.navigate(["/newspapers"])
    }, error => {
      this.onSaving = false
      console.error(error)
    });
  }
}
