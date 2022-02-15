import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { SubjectService } from 'src/app/services/subject/subject.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
  data: any[] = [];
  constructor(
    private loader: LoaderService,
    private toast: ToastrService,
    private subjectServe: SubjectService
  ) { }



  async deleteSubject(id: any): Promise<void> {
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
        await this.subjectServe.deleteSubject(id);
        this.getSubjects();
        this.toast.info('Deleted');
      } catch (error) {
        console.log(error, 'fail to delete');
        this.toast.error('fail to delete');
      }
    }
  }

  // get subject list

  async getSubjects(): Promise<void> {
    try {
      this.loader.show();
      this.data = await this.subjectServe.getSubjects();
    } catch (error) {
      console.log(error);
      this.toast.error('fail to fetch subject')
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getSubjects();
  }

}
