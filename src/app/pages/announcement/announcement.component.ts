import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AnnouncementService } from 'src/app/services/announcement/announcement.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {

  detailsList: any[] = [];
  constructor(
    private announceServe: AnnouncementService,
    private loader: LoaderService,
    private toast: ToastrService
  ) { }


  async getDetails(): Promise<void> {
    try {
      this.loader.show();
      const data = await this.announceServe.getAnnouncements();
      this.detailsList = data.data;
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load')
    } finally {
      this.loader.hide()
    }
  }

  async delete(id: string): Promise<void> {
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
        this.loader.show();
        await this.announceServe.deleteAnnouncement(id);
        this.toast.success('Deleted');
        this.getDetails();
      } catch (error) {
        console.log(error, 'fail to delete');
        this.toast.error('Fail to Delete');
      }finally {
        this.loader.hide()
      }
    }
  }


  ngOnInit(): void {
    this.getDetails();
  }

}
