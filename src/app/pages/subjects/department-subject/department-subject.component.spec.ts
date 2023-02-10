import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentSubjectComponent } from './department-subject.component';

describe('DepartmentSubjectComponent', () => {
  let component: DepartmentSubjectComponent;
  let fixture: ComponentFixture<DepartmentSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
