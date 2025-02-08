import { TestBed } from '@angular/core/testing';

import { RtDatabaseService } from './rt-database.service';

describe('RtDatabaseService', () => {
  let service: RtDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
