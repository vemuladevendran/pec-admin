import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMarksComponent } from './exam-marks.component';

describe('ExamMarksComponent', () => {
  let component: ExamMarksComponent;
  let fixture: ComponentFixture<ExamMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamMarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
