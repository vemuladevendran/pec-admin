import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { SubjectService } from 'src/app/services/subject/subject.service';
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
  subjects: any[] = [];
  subjectsFilter = new FormControl('')
  filters: any;
  constructor(
    private dialog: MatDialog,
    private toast: ToastrService,
    private loader: LoaderService,
    private teacherServe: TeacherService,
    private subjectServe: SubjectService,
  ) { }

  ngOnInit(): void {
    this.getTeachers(this.filters);
    this.getSubjects();
  }

  async deleteStudent(event: any, id: string): Promise<void> {
    event.stopPropagation();
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
        await this.teacherServe.deleteTeacher(id);
        this.toast.success('Deleted');
        this.getTeachers(this.filters);
      } catch (error) {
        console.log(error, 'fail to delete');
        this.toast.error('Fail to Delete');
      }
    }
  }

  openDialog(event: any, data: any) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ViewTeacherComponent, {
      width: '500px',
      height: '300px',
      data: {
        data
      }
    });
  }

  async getTeachers(filters: any): Promise<void> {
    try {
      this.loader.show();
      this.teachers = await this.teacherServe.getTeachers(filters);
    } catch (error: any) {
      console.log(error);
      this.toast.error(error.error  )
    } finally {
      this.loader.hide();
    }
  }

  // get subjects list
  async getSubjects(): Promise<void> {
    try {
      this.subjects = await this.subjectServe.getSubjects();
    } catch (error) {
      console.error(error);
      this.toast.error("Fail to Load Subjects");
    }
  }

  // subject filter change

  onSubjectFilterChange(): void {
    this.filters = {
      subject: this.subjectsFilter.value
    }
    this.getTeachers(this.filters);
  }

}

