import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalMarksComponent } from './internal-marks.component';

describe('InternalMarksComponent', () => {
  let component: InternalMarksComponent;
  let fixture: ComponentFixture<InternalMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalMarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
