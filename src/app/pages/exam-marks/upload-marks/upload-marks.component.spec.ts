import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMarksComponent } from './upload-marks.component';

describe('UploadMarksComponent', () => {
  let component: UploadMarksComponent;
  let fixture: ComponentFixture<UploadMarksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadMarksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
