import { TestBed } from '@angular/core/testing';

import { UserInformationRepositoryService } from './user-information.repository.service';

describe('UserInformationRepositoryService', () => {
  let service: UserInformationRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInformationRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
