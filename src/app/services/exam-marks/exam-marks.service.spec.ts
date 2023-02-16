import { TestBed } from '@angular/core/testing';

import { ExamMarksService } from './exam-marks.service';

describe('ExamMarksService', () => {
  let service: ExamMarksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamMarksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
