import {Component, OnInit} from '@angular/core';
import {SavePurchaseContentDto} from "../../../../../shared/messages/purchase-content/save-purchase-content.dto";
import {ContentPurchaseService} from "../../../../../shared/services/content-purchase.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-content-purchase-create',
  templateUrl: './content-purchase-create.component.html',
  styleUrls: ['./content-purchase-create.component.scss']
})
export class ContentPurchaseCreateComponent implements OnInit {

  constructor(private purchaseContentService: ContentPurchaseService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSave($event: SavePurchaseContentDto) {
    this.purchaseContentService.save($event).subscribe(value => {
      this.router.navigate(['/newspapers/content-purchase'])
    });
  }
}
