import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UntypedFormBuilder} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Customer} from "../../../shared/model/customer";
import {CustomerService} from "../../../shared/services/customer.service";
import {UserService} from "../../../shared/services/user.service";
import {NewspaperService} from "../../../shared/services/newspaper.service";
import {PaginationDto} from "../../../shared/messages/pagination.dto";
import {User} from "../../../shared/model/user";
import {Newspaper} from "../../../shared/model/newspaper";
import {SearchContentDto} from "../../../shared/messages/search-content.dto";
import {ProjectService} from "../../../shared/services/project.service";
import {Project} from "../../../shared/model/project";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-content-search-filter',
  templateUrl: './content-search-filter.component.html',
  styleUrls: ['./content-search-filter.component.scss']
})
export class ContentSearchFilterComponent implements OnInit {

  constructor(
    private formBuilder: UntypedFormBuilder,
    private customerService: CustomerService,
    private userService: UserService,
    private newspaperService: NewspaperService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  customer$ = new BehaviorSubject<Customer[]>([]);
  editor$ = new BehaviorSubject<User[]>([]);
  newspaper$ = new BehaviorSubject<Newspaper[]>([]);
  project$ = new BehaviorSubject<Project[]>([]);

  @Output()
  submitSearchForm = new EventEmitter<SearchContentDto>();

  searchForm = this.formBuilder.group({
    customerId: this.formBuilder.control(null),
    editorId: this.formBuilder.control(null),
    newspaperId: this.formBuilder.control(null),
    projectId: this.formBuilder.control(null),
    globalSearch: this.formBuilder.control(null),
    status: this.formBuilder.control(null),
    deliveryDateFrom: this.formBuilder.control(null),
    deliveryDateTo: this.formBuilder.control(null),
    createdDateFrom: this.formBuilder.control(null),
    createdDateTo: this.formBuilder.control(null),
    monthUse: this.formBuilder.control(null)
  })

  ngOnInit(): void {
    this.customerService.find("", PaginationDto.buildMaxValueOnePage()).subscribe(value => {
      this.customer$.next(value.content)
    })

    this.userService.find("", '', PaginationDto.buildMaxValueOnePage()).subscribe(value => {
      this.editor$.next(value.content)
    })

    this.newspaperService.find({}, PaginationDto.buildMaxValueOnePage()).subscribe(value => {
      this.newspaper$.next(value.content)
    })

    this.projectService.find("", "", PaginationDto.buildMaxValueOnePage()).subscribe(value => {
      this.project$.next(value.content)
    })

    if (this.activatedRoute.snapshot.queryParams.projectId)
      this.searchForm.patchValue({projectId: parseInt(this.activatedRoute.snapshot.queryParams.projectId)})
  }

  onSubmit() {
    this.submitSearchForm.emit(this.searchForm.value as SearchContentDto)
  }
}
