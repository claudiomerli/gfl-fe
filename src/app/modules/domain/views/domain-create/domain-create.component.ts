import {Component, OnInit} from '@angular/core';
import {SaveDomainDto} from "../../../shared/messages/domain/save-domain.dto";
import {DomainService} from "../../../shared/services/domain.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-domain-create',
  templateUrl: './domain-create.component.html',
  styleUrls: ['./domain-create.component.scss']
})
export class DomainCreateComponent implements OnInit {

  constructor(private domainService: DomainService, private router: Router) {
  }


  ngOnInit(): void {
  }


  onFormSubmit(saveDomainDto: SaveDomainDto) {
    this.domainService.save(saveDomainDto).subscribe((savedDomain) => {
      this.router.navigate(['/domain', savedDomain.id])
    })
  }
}
