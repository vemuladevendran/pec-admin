import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { SubjectService } from 'src/app/services/subject/subject.service';
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
  formData = new FormData();
  subjects: any[] = [];
  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private toast: ToastrService,
    private loader: LoaderService,
    private tacherServe: TeacherService,
    private router: Router,
    private subjectServe: SubjectService,

  ) {
    this.createTeacher = this.fb.group({
      teacherName: ['', Validators.required],
      teacherTitle: ['', Validators.required],
      teacherId: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
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
    Object.keys(formValues).forEach((key) => {
      console.log(key, formValues[key]);
      this.formData.append(key, formValues[key]);
    })

    this.formData.append('photo', this.selectedFile);
  }

  // image select
  openFileSelectionDialog(): void {
    this.fileInput?.nativeElement?.click();
  }

  // remove selected image
  removeSelectedImage(): void {
    this.selectedImagePreviewURL = '';
  }

  // get subjects list
  async getSubjects(): Promise<void> {
    try {
      const data = await this.subjectServe.getSubjects();
      data.map((x: any) => {
        this.subjects.push(x.subjectName);
      })
    } catch (error) {
      console.error(error);
      this.toast.error("Fail to Load Subjects");
    }
  }

  ngOnInit(): void {
    this.getSubjects();
  }

}

