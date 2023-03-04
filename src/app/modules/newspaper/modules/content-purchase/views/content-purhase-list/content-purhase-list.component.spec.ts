import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPurhaseListComponent } from './content-purhase-list.component';

describe('ContentPurhaseListComponent', () => {
  let component: ContentPurhaseListComponent;
  let fixture: ComponentFixture<ContentPurhaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentPurhaseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentPurhaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
