import { Component, OnInit } from '@angular/core';
import dummyStudents from './helper';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  students = [...dummyStudents];
  departments: string[] = ['IT', 'CSE', 'ECE', 'EEE', 'MECH'];
  constructor() {}

  ngOnInit(): void {}
}
