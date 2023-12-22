import { TestBed } from '@angular/core/testing';

import { LazyPostService } from './lazy-post.service';

describe('LazyPostService', () => {
  let service: LazyPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazyPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
