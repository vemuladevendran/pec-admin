import { TestBed } from '@angular/core/testing';

import { SemesterMarksService } from './semester-marks.service';

describe('SemesterMarksService', () => {
  let service: SemesterMarksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemesterMarksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
