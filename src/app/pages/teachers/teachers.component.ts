import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';
import Swal from 'sweetalert2';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss'],
})
export class TeachersComponent implements OnInit {
  departments: string[] = ['IT', 'CSE', 'ECE', 'EEE', 'MECH'];

  teachers: any[] = [];

  constructor(
    private dialog: MatDialog,
    private toast: ToastrService,
    private loader: LoaderService,
    private teacherServe: TeacherService,
  ) { }

  ngOnInit(): void {
    this.getTeachers();
  }

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

  openDialog(data: any) {
    const dialogRef = this.dialog.open(ViewTeacherComponent, {
      width: '500px',
      height: '300px',
      data: {
        data
      }
    });
  }

  async getTeachers(): Promise<void> {
    try {
      this.loader.show();
      this.teachers = await this.teacherServe.getTeachers();
      console.log(this.teachers);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error.error)
    } finally {
      this.loader.hide();
    }
  }
}
