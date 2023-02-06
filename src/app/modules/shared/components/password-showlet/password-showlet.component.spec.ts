import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordShowletComponent } from './password-showlet.component';

describe('PasswordShowletComponent', () => {
  let component: PasswordShowletComponent;
  let fixture: ComponentFixture<PasswordShowletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasswordShowletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasswordShowletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
