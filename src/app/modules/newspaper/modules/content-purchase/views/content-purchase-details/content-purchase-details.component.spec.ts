import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPurchaseDetailsComponent } from './content-purchase-details.component';

describe('ContentPurchaseDetailsComponent', () => {
  let component: ContentPurchaseDetailsComponent;
  let fixture: ComponentFixture<ContentPurchaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentPurchaseDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentPurchaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
