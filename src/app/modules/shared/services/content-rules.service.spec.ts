import { TestBed } from '@angular/core/testing';

import { ContentRulesService } from './content-rules.service';

describe('ContentRulesService', () => {
  let service: ContentRulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentRulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
