import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPurchaseListComponent } from './content-purchase-list.component';

describe('ContentpurchaseListComponent', () => {
  let component: ContentPurchaseListComponent;
  let fixture: ComponentFixture<ContentPurchaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentPurchaseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentPurchaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
