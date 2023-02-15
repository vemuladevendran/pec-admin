import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AnnouncementService } from 'src/app/services/announcement/announcement.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.scss']
})
export class CreateAnnouncementComponent implements OnInit {
  announcementForm: FormGroup;
  selectedFile: any;
  formData = new FormData();
  constructor(
    private fb: FormBuilder,
    private toast: ToastrService,
    private loader: LoaderService,
    private announceServe: AnnouncementService,
    private router: Router,
  ) {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      url: ['', Validators.required],
      image: [null, Validators.required],
    })
  };


  // image change handle
  handleFileSelection(event: any): void {
    const [file] = event.target.files;
    this.selectedFile = file;
  }

  // update form data

  updateFormData(): void {
    const formValues = this.announcementForm.value;
    Object.entries(formValues).forEach(([key, value]: any) => {
      if (Array.isArray(value)) {
        value.forEach(v => {
          this.formData.append(key, v);
        })
      } else {
        this.formData.append(key, value);
      }
    })
    if (!this.announcementForm.value?.image) return;
    this.formData.append('image', this.selectedFile)
  };

  // handle submit the form
  async handleSubmit(): Promise<void> {
    try {
      this.loader.show();
      this.updateFormData();
      await this.announceServe.create(this.formData);
      this.toast.success('Announcement uploaded');
      this.router.navigate(['/announcement'])
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to create')
    } finally {
      this.loader.hide()
    }
  }


  ngOnInit(): void {
  }

}
