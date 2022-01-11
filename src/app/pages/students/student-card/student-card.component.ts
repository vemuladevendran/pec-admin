import { StudentDetailComponent } from './../student-detail/student-detail.component';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-student-card',
  templateUrl: './student-card.component.html',
  styleUrls: ['./student-card.component.scss'],
})
export class StudentCardComponent implements OnInit {
  @Input('student') student: any = '';
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = this.student;

    this.dialog.open(StudentDetailComponent, dialogConfig);
  }
}
