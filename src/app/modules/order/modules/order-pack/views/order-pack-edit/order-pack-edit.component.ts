import {Component, OnInit} from '@angular/core';
import {OrderPackService} from "../../../../../shared/services/order-pack.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderPack} from "../../../../../shared/messages/order/order-pack";
import {ConfirmDialogComponent} from "../../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatLegacyDialog as MatDialog} from "@angular/material/legacy-dialog";
import {SaveOrderPackDto} from "../../../../../shared/messages/order/save-order-pack.dto";

@Component({
  selector: 'app-order-pack-edit',
  templateUrl: './order-pack-edit.component.html',
  styleUrls: ['./order-pack-edit.component.scss']
})
export class OrderPackEditComponent implements OnInit {
  public orderPackToEdit!: OrderPack;

  constructor(private orderPackService: OrderPackService, private activatedRoute: ActivatedRoute, private matDialog: MatDialog, private router: Router) {
  }

  ngOnInit(): void {
    let snapshot = this.activatedRoute.snapshot;
    let id = snapshot.paramMap.get("id");

    this.orderPackService.findById(parseInt(id!)).subscribe(op => {
      this.orderPackToEdit = op;
    })
  }

  onDelete() {
    this.matDialog.open(ConfirmDialogComponent, {
      data: "Sei sicuro di voler cancellare il pacchetto?"
    }).afterClosed().subscribe((answer) => {
      if (answer) {
        this.orderPackService.delete(this.orderPackToEdit!.id!).subscribe(() => {
          this.router.navigate(['/orders/pack'])
        });
      }
    })
  }

  onSave($event: SaveOrderPackDto) {
    this.orderPackService.update(this.orderPackToEdit.id, $event).subscribe()
  }
}
