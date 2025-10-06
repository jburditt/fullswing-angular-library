import { TestBed } from '@angular/core/testing';

import { FullswingAngularLibraryService } from './fullswing-angular-library.service';

describe('FullswingAngularLibraryService', () => {
  let service: FullswingAngularLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullswingAngularLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
