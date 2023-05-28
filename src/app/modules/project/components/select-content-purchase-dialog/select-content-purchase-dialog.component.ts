import {Component, Inject, OnInit} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";
import {Project, ProjectCommission} from "../../../shared/messages/project/project";
import {ContentPurchaseService} from "../../../shared/services/content-purchase.service";
import {PaginationDto} from "../../../shared/messages/common/pagination.dto";
import {PageResponseDto} from "../../../shared/messages/common/page-response.dto";
import {PurchaseContent} from "../../../shared/messages/purchase-content/purchase-content";

@Component({
  selector: 'app-select-content-purchase-dialog',
  templateUrl: './select-content-purchase-dialog.component.html',
  styleUrls: ['./select-content-purchase-dialog.component.scss']
})
export class SelectContentPurchaseDialogComponent implements OnInit {


  constructor(
    public dialogRef: MatDialogRef<SelectContentPurchaseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public newspaperId: number,
    private contentPurchaseService: ContentPurchaseService
  ) {
  }

  page!: PageResponseDto<PurchaseContent>;
  selectedPurchaseContent?: PurchaseContent;

  ngOnInit(): void {
    this.contentPurchaseService.findAll({
      newspaperId: this.newspaperId,
      globalSearch: "",
      expirationFrom: "",
      expirationTo: ""
    }, new PaginationDto(0, 10000000, "DESC", "contentRemaining"))
      .subscribe(value => {
        value.content = value.content.filter(element => element.contentRemaining > 0)
        this.page = value;
      })
  }

  getJoinedNewspaperNames(element: PurchaseContent) {
    return element.newspapers.map(value => value.name).join(", ")
  }

  confirm() {
    if (this.selectedPurchaseContent) {
      this.dialogRef.close(this.selectedPurchaseContent)
    }
  }
}
