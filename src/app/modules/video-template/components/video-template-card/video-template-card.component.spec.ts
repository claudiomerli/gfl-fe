import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTemplateCardComponent } from './video-template-card.component';

describe('VideoTemplateCardComponent', () => {
  let component: VideoTemplateCardComponent;
  let fixture: ComponentFixture<VideoTemplateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoTemplateCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoTemplateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
