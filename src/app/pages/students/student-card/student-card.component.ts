import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss'],
})
export class StudentCardComponent implements OnInit {
  @Input('student') student: any;
  @Output() deleteStudentId = new EventEmitter<string>();

  constructor(
  ) { }

  ngOnInit(): void { }

  deleteStudent(id: string) {
    this.deleteStudentId.emit(id);
  }
}
