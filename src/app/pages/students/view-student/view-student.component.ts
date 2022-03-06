import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {
  studentId = '';
  studentData: any;
  constructor(
    private studentServe: StudentService,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private toast: ToastrService
  ) {
    this.studentId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  async getStudentData(): Promise<void> {
    try {
      this.loader.show();
      this.studentData = await this.studentServe.getStudentById(this.studentId);
      console.log(this.studentData);
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to Load data');
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getStudentData();
  }

}
