import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {

  createTeacher: FormGroup
  constructor(
    private fb: FormBuilder,
  ) {
    this.createTeacher = this.fb.group({
      teacherName: ['', Validators.required],
      teacherTitle: ['', Validators.required],
      teacherId: ['', Validators.required],
      majorSubject: ['', Validators.required],
      handlingSubjects: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

}
