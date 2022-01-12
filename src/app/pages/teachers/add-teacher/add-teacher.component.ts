import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

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
  selectedFile: File | undefined;
  subjects = ['ANT', 'web technology', 'computer Networks', 'Software Engineering']
  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,

  ) {
    this.createTeacher = this.fb.group({
      teacherName: ['', Validators.required],
      teacherTitle: ['', Validators.required],
      teacherId: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      majorSubject: ['', Validators.required],
      handlingSubjects: ['', Validators.required]
    })
  }

  handleSubmit(): void {
    console.log(this.createTeacher.value);
  }

  // image change handle
  handleFileSelection(): void {
    const [file] = this.fileInput?.nativeElement?.files as any as File[];
    if (file) {
      this.selectedFile = file;
      this.selectedImagePreviewURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
    }
  }

  // image select
  openFileSelectionDialog(): void {
    this.fileInput?.nativeElement?.click();
  }

  ngOnInit(): void {
  }

}

