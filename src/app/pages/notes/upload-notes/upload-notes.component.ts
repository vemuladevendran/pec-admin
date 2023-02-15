import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentService } from 'src/app/services/department/department.service';
import { NotesService } from 'src/app/services/notes/notes.service';
import { SubjectService } from 'src/app/services/subject/subject.service';

@Component({
  selector: 'app-upload-notes',
  templateUrl: './upload-notes.component.html',
  styleUrls: ['./upload-notes.component.scss']
})
export class UploadNotesComponent implements OnInit {

  departmentList: any[] = [];
  uploadForm: FormGroup;
  subjectList: any[] = [];
  semesterList: any[] = [];
  selectedFile: any;
  formData = new FormData();
  constructor(
    private departmentServe: DepartmentService,
    private fb: FormBuilder,
    private toast: ToastrService,
    private subjectServe: SubjectService,
    private notesServe: NotesService,
    private route: Router,
  ) {
    this.uploadForm = this.fb.group({
      departmentName: ['', Validators.required],
      year: ['', Validators.required],
      semester: ['', Validators.required],
      subject: ['', Validators.required],
      unit: ['', Validators.required],
      pdfFile: [null, Validators.required]
    })
  }


  //  get department list

  async getDepartmentList(): Promise<void> {
    try {
      this.departmentList = await this.departmentServe.getDepartmentDetails();
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to fetch department list')
    }
  }

  // getSubjectDetails
  async getSubjectDetails(): Promise<void> {
    try {
      const filters = {
        departmentName: this.uploadForm.value.departmentName,
        year: this.uploadForm.value.year,
        semester: this.uploadForm.value.semester,
      }
      const data = await this.subjectServe.getDepartmentSubjects(filters)
      this.subjectList = data[0].subjects;
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to load subjects')
    }
  }

  // handle submit the form
  async handleSubmit(): Promise<void> {
    try {
      this.updateFormData();
      await this.notesServe.uploadNotes(this.formData);
      this.route.navigate(['/notes']);
      this.toast.success('Notes uploaded')
    } catch (error) {
      console.log(error);
      this.toast.error('Fail to upload notes')
    }
  }

  // handle year change
  handleYearChange() {
    const selectedYear = this.uploadForm.value.year;
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
  }

  // image change handle
  handleFileSelection(event: any): void {
    const [file] = event.target.files;
    this.selectedFile = file;
  }


  // update form data

  updateFormData(): void {
    const formValues = this.uploadForm.value;
    Object.entries(formValues).forEach(([key, value]: any) => {
      if (Array.isArray(value)) {
        value.forEach(v => {
          this.formData.append(key, v);
        })
      } else {
        this.formData.append(key, value);
      }
    })
    if (!this.uploadForm.value?.pdfFile) return;
    this.formData.append('pdfFile', this.selectedFile)
  }

  ngOnInit(): void {
    this.getDepartmentList();
  }

}
