import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.scss']
})
export class ViewDepartmentComponent implements OnInit {

  firstYears = [
    {
      departmentName: 'It',
      section: 'A',
      classIncharge: 'deva'
    },
    {
      departmentName: 'It',
      section: 'B',
      classIncharge: 'deva'
    },
    {
      departmentName: 'It',
      section: 'C',
      classIncharge: 'deva'
    },
    {
      departmentName: 'It',
      section: 'D',
      classIncharge: 'deva',
    }
  ];

  classStudentsList = [
    {
      rollNumber: '57648584',
      examNumber: '57648584',
      name: '57648584',
      id: '485784'
    },
    {
      rollNumber: '57648584',
      examNumber: '57648584',
      name: '57648584',
      id: '485784'
    },
    {
      rollNumber: '57648584',
      examNumber: '57648584',
      name: '57648584',
      id: '485784'
    },
    {
      rollNumber: '57648584',
      examNumber: '57648584',
      name: '57648584',
      id: '485784'
    },
    {
      rollNumber: '57648584',
      examNumber: '57648584',
      name: '57648584',
      id: '485784'
    },
    {
      rollNumber: '57648584',
      examNumber: '57648584',
      name: '57648584',
      id: '485784'
    },
    {
      rollNumber: '57648584',
      examNumber: '57648584',
      name: '57648584',
      id: '485784'
    },
    {
      rollNumber: '57648584',
      examNumber: '57648584',
      name: '57648584',
      id: '485784'
    },
    {
      rollNumber: '57648584',
      examNumber: '57648584',
      name: '57648584',
      id: '485784'
    },
    {
      rollNumber: '57648584',
      examNumber: '57648584',
      name: '57648584',
      id: '485784'
    },

  ]

  constructor() { }

  ngOnInit(): void {
  }

}
