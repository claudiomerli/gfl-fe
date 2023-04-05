import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorStatisticsDashboardComponent } from './editor-statistics-dashboard.component';

describe('EditorStatisticsDashboardComponent', () => {
  let component: EditorStatisticsDashboardComponent;
  let fixture: ComponentFixture<EditorStatisticsDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorStatisticsDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorStatisticsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
