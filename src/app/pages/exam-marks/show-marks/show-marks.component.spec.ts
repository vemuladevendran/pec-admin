import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMarksComponent } from './show-marks.component';

describe('ShowMarksComponent', () => {
  let component: ShowMarksComponent;
  let fixture: ComponentFixture<ShowMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
