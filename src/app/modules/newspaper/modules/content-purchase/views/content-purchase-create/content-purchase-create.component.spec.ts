import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPurchaseCreateComponent } from './content-purchase-create.component';

describe('ContentPurchaseCreateComponent', () => {
  let component: ContentPurchaseCreateComponent;
  let fixture: ComponentFixture<ContentPurchaseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentPurchaseCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentPurchaseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
