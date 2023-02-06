import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SaveHostingDto} from "../../../shared/messages/hosting/save-hosting.dto";
import {HostingService} from "../../../shared/services/hosting.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-hosting-create',
  templateUrl: './hosting-create.component.html',
  styleUrls: ['./hosting-create.component.scss']
})
export class HostingCreateComponent implements OnInit {

  constructor(private hostingService: HostingService, private router: Router) {
  }


  ngOnInit(): void {
  }


  onFormSubmit(saveHostingDto: SaveHostingDto) {
    this.hostingService.save(saveHostingDto).subscribe((savedHosting) => {
      this.router.navigate(['/hosting', savedHosting.id])
    })
  }
}
