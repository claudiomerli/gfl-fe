import {Component, OnInit} from '@angular/core';
import {HostingService} from "../../../shared/services/hosting.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Hosting} from "../../../shared/messages/hosting/hosting";
import {SaveHostingDto} from "../../../shared/messages/hosting/save-hosting.dto";

@Component({
  selector: 'app-hosting-edit',
  templateUrl: './hosting-edit.component.html',
  styleUrls: ['./hosting-edit.component.scss']
})
export class HostingEditComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private hostingService: HostingService, private router: Router) {
  }

  public hostingToEdit?: Hosting;

  ngOnInit(): void {
    let paramMap = this.activatedRoute.snapshot.params;
    if (paramMap.id) {
      this.hostingService
        .findById(parseInt(paramMap.id))
        .subscribe(hosting => {
          this.hostingToEdit = hosting;
        })
    }
  }

  onFormSubmit(saveHostingDto: SaveHostingDto) {
    this.hostingService
      .update(this.hostingToEdit!.id, saveHostingDto)
      .subscribe((value) => {
        this.hostingToEdit = value
      })
  }
}
