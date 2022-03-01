import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCountCardsComponent } from './student-count-cards.component';

describe('StudentCountCardsComponent', () => {
  let component: StudentCountCardsComponent;
  let fixture: ComponentFixture<StudentCountCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCountCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCountCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
