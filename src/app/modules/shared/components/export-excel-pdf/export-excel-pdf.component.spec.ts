import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportExcelPdfComponent } from './export-excel-pdf.component';

describe('ExportExcelPdfComponent', () => {
  let component: ExportExcelPdfComponent;
  let fixture: ComponentFixture<ExportExcelPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportExcelPdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportExcelPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
