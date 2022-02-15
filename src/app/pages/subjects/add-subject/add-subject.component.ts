import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { SubjectService } from 'src/app/services/subject/subject.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {
  createSubject: FormGroup
  constructor(
    private fb: FormBuilder,
    private loader: LoaderService,
    private toast: ToastrService,
    private subjectServe: SubjectService,
    private router: Router,
  ) {
    this.createSubject = this.fb.group({
      subjectName: ['', [Validators.required]],
      subjectCode: ['', [Validators.required]],
    })
  }

  // onsubmit

  async handleSubmit(): Promise<void> {
    try {
      this.loader.show();
      const data = await this.subjectServe.createSubject(this.createSubject.value);
      this.toast.success(data)
      this.router.navigate(['/subjects'])
    } catch (error: any) {
      console.log(error);
      this.toast.error(error)
    } finally {
      this.loader.hide();
    }
  }


  ngOnInit(): void {
  }

}
