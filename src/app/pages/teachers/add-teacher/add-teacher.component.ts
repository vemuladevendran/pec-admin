import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { TeacherService } from 'src/app/services/teacher/teacher.service';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss']
})
export class AddTeacherComponent implements OnInit {
  @ViewChild('profileUpload') fileInput: ElementRef<HTMLInputElement> | undefined;
  defaultImageUrl = "/assets/default-profile.png"
  createTeacher: FormGroup
  selectedImagePreviewURL: any = "";
  selectedFile: any;
  formData: any;
  subjects = ['ANT', 'web technology', 'computer Networks', 'Software Engineering']
  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private toast: ToastrService,
    private loader: LoaderService,
    private tacherServe: TeacherService,
    private router: Router

  ) {
    this.createTeacher = this.fb.group({
      teacherName: ['', Validators.required],
      teacherTitle: ['', Validators.required],
      teacherId: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      majorSubject: ['', Validators.required],
      handlingSubjects: ['', Validators.required],
      photo: [null],
    })
  }

  async handleSubmit(): Promise<void> {
    try {
      this.updateFormData();
      if (this.selectedFile !== undefined) {
        this.loader.show();
        await this.tacherServe.createTeacher(this.formData);
        this.toast.success('Created');
        this.router.navigate(['/teachers'])
        return;
      };
      this.loader.show();
      await this.tacherServe.createTeacher(this.createTeacher.value);
      this.toast.success('Created');
      this.router.navigate(['/teachers'])
      return;

    } catch (error: any) {
      console.error(error);
      this.toast.error(error.error);
    } finally {
      this.loader.hide();
    }
  }

  // image change handle
  handleFileSelection(): void {
    const [file] = this.fileInput?.nativeElement?.files as any as File[];
    if (file) {
      this.selectedFile = file;
      this.selectedImagePreviewURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
  }

  // update form data

  updateFormData(): void {
    const formValues = this.createTeacher.value;
    this.formData = new FormData();
    Object.keys(formValues).forEach((key) => {
      this.formData.append(key, formValues[key]);
    })
    this.formData.append('photo', this.selectedFile);
  }

  // image select
  openFileSelectionDialog(): void {
    this.fileInput?.nativeElement?.click();
  }

  ngOnInit(): void {
  }

}

