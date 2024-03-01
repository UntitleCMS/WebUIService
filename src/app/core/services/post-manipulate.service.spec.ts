import { TestBed } from '@angular/core/testing';

import { PostManipulateService } from './post-manipulate.service';

describe('PostManipulateService', () => {
  let service: PostManipulateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostManipulateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
