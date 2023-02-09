import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department/department.service';
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
  teacherId = '';
  departments: any[] = [];
  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private toast: ToastrService,
    private loader: LoaderService,
    private tacherServe: TeacherService,
    private router: Router,
    private subjectServe: SubjectService,
    private route: ActivatedRoute,
    private departmentServe: DepartmentService,

  ) {
    this.createTeacher = this.fb.group({
      teacherName: ['', Validators.required],
      teacherTitle: ['', Validators.required],
      teacherId: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', Validators.required],
      majorSubject: ['', Validators.required],
      handlingSubjects: ['', Validators.required],
      department: ['', Validators.required],
      photo: [null],
    })
    this.teacherId = this.route.snapshot.paramMap.get('id') ?? '';
  }

  async handleSubmit(): Promise<void> {
    try {
      console.log(this.selectedFile);
      // checking image file
      if (this.selectedFile !== undefined) {
        this.updateFormData();
        this.loader.show();

        // checking update form or add form
        if (this.teacherId !== '') {
          await this.tacherServe.updateTeacher(this.teacherId, this.formData);
          this.toast.success('Updated');
          this.router.navigate(['/teachers'])
          return;
        }
        await this.tacherServe.createTeacher(this.formData);
        this.toast.success('Created');
        this.router.navigate(['/teachers'])
        return;
      };
      this.loader.show();

      // checking update form or add form

      if (this.teacherId !== '') {
        if (this.selectedImagePreviewURL === '') {
          this.createTeacher.value.photo = null;
        }
        await this.tacherServe.updateTeacher(this.teacherId, this.createTeacher.value);
        this.toast.success('Updated');
        this.router.navigate(['/teachers'])
        return;
      }
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
    Object.entries(formValues).forEach(([key, value]: any) => {
      if (Array.isArray(value)) {
        value.forEach(v => {
          this.formData.append(key, v);
        })
      } else {
        this.formData.append(key, value);
      }
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

   // get department
   async getDepartments(): Promise<void> {
    try {
      this.departments = await this.departmentServe.getDepartmentDetails();
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message);
    }
  }


  // get form values

  async getFormValues(): Promise<void> {
    try {
      if (this.teacherId === '') {
        return;
      }
      this.loader.show();
      const data = await this.tacherServe.getTeacherById(this.teacherId);
      if (data.photo !== null) {
        this.selectedImagePreviewURL = data?.photo;
      }

      this.createTeacher.patchValue(data);
      console.log(data);

    } catch (error) {
      this.toast.error('fail to get details')
    } finally {
      this.loader.hide();
    }
  }

  ngOnInit(): void {
    this.getDepartments();
    this.getSubjects();
    this.getFormValues();
  }

}

