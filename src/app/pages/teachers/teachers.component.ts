import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent implements OnInit {
  departments: string[] = ['IT', 'CSE', 'ECE', 'EEE', 'MECH'];

  @Input('teacher') teacher: any = '';
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  async deleteStudent(event: any): Promise<void> {
    event.stopPropagation()
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
      } catch (error) {
        console.log(error, 'fail to delete');
      }
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(ViewTeacherComponent, {
      width: '500px',
      height:'300px'
    });
  }
}
