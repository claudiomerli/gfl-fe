import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInvoicingComponent } from './project-invoicing.component';

describe('ProjectPublishingComponent', () => {
  let component: ProjectInvoicingComponent;
  let fixture: ComponentFixture<ProjectInvoicingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInvoicingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInvoicingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
