import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPurchaseFormComponent } from './content-purchase-form.component';

describe('ContentPurchaseFormComponent', () => {
  let component: ContentPurchaseFormComponent;
  let fixture: ComponentFixture<ContentPurchaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentPurchaseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentPurchaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
