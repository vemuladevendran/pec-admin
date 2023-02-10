import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmentSubjectComponent } from './add-department-subject.component';

describe('AddDepartmentSubjectComponent', () => {
  let component: AddDepartmentSubjectComponent;
  let fixture: ComponentFixture<AddDepartmentSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDepartmentSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepartmentSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
