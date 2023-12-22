import { TestBed } from '@angular/core/testing';

import { CommentRepositoryService } from './comment-repository.service';

describe('CommentRepositoryService', () => {
  let service: CommentRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
