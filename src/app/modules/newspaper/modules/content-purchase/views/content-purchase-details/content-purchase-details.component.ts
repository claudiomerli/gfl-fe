import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PurchaseContent} from "../../../../../shared/messages/purchase-content/purchase-content";
import {ContentPurchaseService} from "../../../../../shared/services/content-purchase.service";
import {SavePurchaseContentDto} from "../../../../../shared/messages/purchase-content/save-purchase-content.dto";

@Component({
  selector: 'app-content-purchase-details',
  templateUrl: './content-purchase-details.component.html',
  styleUrls: ['./content-purchase-details.component.scss']
})
export class ContentPurchaseDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private contentPurchaseService: ContentPurchaseService, private router : Router) {
  }

  contentPurchase!: PurchaseContent;

  ngOnInit(): void {
    let id = parseInt(this.activatedRoute.snapshot.params.id);
    this.contentPurchaseService.findById(id).subscribe(value => {
      this.contentPurchase = value;
    })
  }

  onSave($event: SavePurchaseContentDto) {
    this.contentPurchaseService.update(this.contentPurchase.id, $event).subscribe(() => {
      this.router.navigate(['/newspapers/content-purchase'])
    })

  }

  onDelete() {
    this.contentPurchaseService.delete(this.contentPurchase.id).subscribe(() =>{
      this.router.navigate(['/newspapers/content-purchase'])
    })
  }
}
