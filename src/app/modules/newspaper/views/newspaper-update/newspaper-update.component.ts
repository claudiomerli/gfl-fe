import { Component, OnInit } from '@angular/core';
import {Newspaper} from "../../../shared/model/newspaper";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SaveNewspaperDto} from "../../../shared/messages/newspaper/save-newspaper.dto";
import {ToastService} from "../../../shared/services/toast.service";

@Component({
  selector: 'app-newspaper-update',
  templateUrl: './newspaper-update.component.html',
  styleUrls: ['./newspaper-update.component.scss']
})
export class NewspaperUpdateComponent implements OnInit {

  onSaving = false;
  newspaperToUpdate: Newspaper | undefined;

  constructor(private newspaperService: NewspaperService,
              private toastService: ToastService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute
      .paramMap
      .subscribe(params => {
        let id = params.get("id");
        if (id) {
          this.newspaperService.findById(parseInt(id))
            .subscribe(newspaper => {
              this.newspaperToUpdate = newspaper
            })
        }
      })
  }

  onSubmit($event: SaveNewspaperDto) {
    this.onSaving = true
    if (this.newspaperToUpdate?.id) {
      this.newspaperService
        .update(this.newspaperToUpdate?.id, $event)
        .subscribe(() => {
          this.onSaving = false;
          this.toastService.showGenericSuccess();
          this.router.navigate(["/newspapers"])
        }, error => {
          this.onSaving = false;
          this.toastService.showError(error.message);
          console.error(error);
        });
    }
  }
}
