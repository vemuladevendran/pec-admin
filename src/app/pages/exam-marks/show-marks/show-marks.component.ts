import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { SemesterMarksService } from 'src/app/services/semester-exam-marks/semester-marks.service';

@Component({
  selector: 'app-show-marks',
  templateUrl: './show-marks.component.html',
  styleUrls: ['./show-marks.component.scss']
})
export class ShowMarksComponent implements OnInit {

  marksId = '';
  markDetails:any;
  constructor(
    private toast: ToastrService,
    private loader: LoaderService,
    private marksServe: SemesterMarksService,
    private route: ActivatedRoute
  ) {
    this.marksId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  // marks
  async getMarkDetails():Promise<void>{
    try {
      this.loader.show();
      this.markDetails = await this.marksServe.getMarksById(this.marksId);
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load');
    }finally{
      this.loader.hide();
    }
  }

  printMarks(){
    window.print();
  }

  ngOnInit(): void {
    this.getMarkDetails();
  }


}
