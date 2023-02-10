import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubjectService } from 'src/app/services/subject/subject.service';

@Component({
  selector: 'app-department-subject',
  templateUrl: './department-subject.component.html',
  styleUrls: ['./department-subject.component.scss']
})
export class DepartmentSubjectComponent implements OnInit {

  subjectsList: any[] = [];
  constructor(
    private subjectServe: SubjectService,
    private toast: ToastrService,
  ) { }


  // get subject list
  async getSubjectList(): Promise<void> {
    try {
      this.subjectsList = await this.subjectServe.getDepartmentSubjects();
    } catch (error) {
      console.log(error);
      this.toast.error('fail to load subjects')
    }
  }

  ngOnInit(): void {
    this.getSubjectList();
  }

}
