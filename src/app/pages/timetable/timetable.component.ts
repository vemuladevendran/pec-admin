import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { TimeTableService } from 'src/app/services/time-table/time-table.service';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {
  timeTableList: any[] = [];

  constructor(
    private timeTableServe: TimeTableService,
    private loader: LoaderService,
    private toast: ToastrService,
  ) { }


  // get timetables
  async getTimeTables(): Promise<void> {
    try {
      this.loader.show();
      const data = await this.timeTableServe.getTimeTable();
      this.timeTableList = data.data;
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message);
    }finally{
      this.loader.hide();
    }
  }
  ngOnInit(): void {
    this.getTimeTables();
  }

}
