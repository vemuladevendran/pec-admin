import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department/department.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { StudentService } from 'src/app/services/student/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  @ViewChild('profileUpload') fileInput: ElementRef<HTMLInputElement> | undefined;
  defaultImageUrl = "/assets/default-profile.png"
  selectedImagePreviewURL: any = "";
  selectedFile: any;
  createStudent: FormGroup;
  departmentList: any = [];
  sectionList: any = [];
  semesterList: any = [];
  selectedDepartmentDetails: any;
  studentId = '';
  formData = new FormData();
  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private toast: ToastrService,
    private loader: LoaderService,
    private departmentServe: DepartmentService,
    private studentServe: StudentService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.createStudent = this.fb.group({
      studentName: ['', [Validators.required]],
      rollNumber: ['', [Validators.required]],
      examNumber: ['', [Validators.required]],
      department: ['', [Validators.required]],
      year: ['', [Validators.required]],
      section: ['', [Validators.required]],
      semester: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobileNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      photo: [null],
    });
    this.studentId = this.route.snapshot.paramMap.get('id') ?? '';
  }


  // image change handle
  handleFileSelection(): void {
    const [file] = this.fileInput?.nativeElement?.files as any as File[];
    if (file) {
      this.selectedFile = file;
      this.selectedImagePreviewURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
  }

  // getting department list
  async getDepartmentList(): Promise<void> {
    try {
      this.departmentList = await this.departmentServe.getDepartmentDetails();
    } catch (error) {
      console.log(error);
      this.toast.error('Fali to Load Department List');
    }
  };

  // get section list
  async getDepartmentDetails(): Promise<void> {
    try {
      const name = this.createStudent.value.department;
      if (name !== '') {
        this.departmentList.find(async (x: any) => {
          if (x.departmentName === name) {
            this.loader.show();
            this.selectedDepartmentDetails = await this.departmentServe.getDepartmentById(x.id);
            this.sectionList = this.selectedDepartmentDetails.years[this.createStudent.value.year];
          }
          return;
        })
      }
      const selectedYear = this.createStudent.value.year;
      switch (selectedYear) {
        case 'firstYear':
          this.semesterList = ['1', '2']
          break;
        case 'secondYear':
          this.semesterList = ['3', '4']
          break;
        case 'thirdYear':
          this.semesterList = ['5', '6']
          break;
        case 'fourthYear':
          this.semesterList = ['7', '8']
          break;
        default:
          this.semesterList = ['1', '2', '3', '4', '5', '6', '7', '8']
          break;
      }
    } catch (error) {
      console.log(error);
      this.toast.error('Fali to Load Section');
    } finally {
      this.loader.hide();
    }
  }

  // form submit
  async handleSubmit(): Promise<void> {
    try {
      // checking image file
      if (this.selectedFile !== undefined) {
        this.updateFormData();
        this.loader.show();

        // checking update form or add form
        if (this.studentId !== '') {
          await this.studentServe.updateStudent(this.studentId, this.formData);
          this.toast.success('Updated');
          this.router.navigate(['/students'])
          return;
        }
        await this.studentServe.createStudent(this.formData);
        this.toast.success('created');
        this.router.navigate(['/students'])
        return;
      };
      this.loader.show();
      // checking update form or add form
      if (this.studentId !== '') {
        if (this.selectedImagePreviewURL === '') {
          this.createStudent.value.photo = null;
        }
        await this.studentServe.updateStudent(this.studentId, this.createStudent.value);
        this.toast.success('Updated');
        this.router.navigate(['/students'])
        return;
      }
      await this.studentServe.createStudent(this.createStudent.value);
      this.toast.success('created');
      this.router.navigate(['/students'])
    } catch (error: any) {
      console.log(error);
      this.toast.error(error.error)
    } finally {
      this.loader.hide();
    }
  }

  // update form data
  updateFormData(): void {
    const formValues = this.createStudent.value;
    Object.keys(formValues).forEach((key) => {
      this.formData.append(key, formValues[key]);
    })

    this.formData.append('photo', this.selectedFile);
  }

  // get form values
  async getFormValues(): Promise<void> {
    try {
      if (this.studentId === '') {
        return;
      }
      this.loader.show();
      const data = await this.studentServe.getStudentById(this.studentId);
      if (data.photo !== null) {
        this.selectedImagePreviewURL = data?.photo;
      }
      // applying update values to form
      this.createStudent.patchValue(data);
      await this.getDepartmentDetails();
      console.log(data);
    } catch (error) {
      this.toast.error('fail to get details')
    } finally {
      this.loader.hide();
    }
  }


  ngOnInit(): void {
    this.getDepartmentList();
    this.getFormValues();
  }

}
