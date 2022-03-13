import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss'],
})
export class StudentCardComponent implements OnInit {
  @Input('student') student: any;
  @Output() deleteStudentId = new EventEmitter<string>();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  // open view student page
  viewStudent(id: string): void {
    this.router.navigate([`/students/view-student/${id}`])
  }

  // Emit the student id to delete the student
  deleteStudent(id: string, event: any) {
    event.stopPropagation();
    this.deleteStudentId.emit(id);
  }
}
