import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  createStudent: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.createStudent = this.fb.group({
      studentName: ['', [Validators.required]],
      rollNumber: ['', [Validators.required]],
      registerNumber: ['', [Validators.required]],
      department: ['', [Validators.required]],
      class: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      year: ['', [Validators.required]],
      semester: ['', [Validators.required]],
      address: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

}
