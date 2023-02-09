import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetReportsComponent } from './get-reports.component';

describe('GetReportsComponent', () => {
  let component: GetReportsComponent;
  let fixture: ComponentFixture<GetReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
