import {Component, OnInit} from '@angular/core';
import {DomainService} from "../../../shared/services/domain.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Domain} from "../../../shared/messages/domain/domain";
import {SaveDomainDto} from "../../../shared/messages/domain/save-domain.dto";

@Component({
  selector: 'app-domain-edit',
  templateUrl: './domain-edit.component.html',
  styleUrls: ['./domain-edit.component.scss']
})
export class DomainEditComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private domainService: DomainService, private router: Router) {
  }

  public domainToEdit?: Domain;

  ngOnInit(): void {
    let paramMap = this.activatedRoute.snapshot.params;
    if (paramMap.id) {
      this.domainService
        .findById(parseInt(paramMap.id))
        .subscribe(domain => {
          this.domainToEdit = domain;
        })
    }
  }

  onFormSubmit(saveDomainDto: SaveDomainDto) {
    this.domainService
      .update(this.domainToEdit!.id, saveDomainDto)
      .subscribe((value) => {
        this.domainToEdit = value
      })
  }
}
