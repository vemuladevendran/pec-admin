import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { SemesterMarksService } from 'src/app/services/semester-exam-marks/semester-marks.service';

@Component({
  selector: 'app-subjects-card',
  templateUrl: './subjects-card.component.html',
  styleUrls: ['./subjects-card.component.scss']
})
export class SubjectsCardComponent implements OnInit {

  studentData: any;
  examData: any;
  subjectsList: any[] = [];

  marksForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<SubjectsCardComponent>,
    private fb: FormBuilder,
    private marksServe: SemesterMarksService,
    private loader: LoaderService,
    private toast: ToastrService,
  ) {
    this.marksForm = this.fb.group({
      studentName: ['', Validators.required],
      examNumber: ['', Validators.required],
      departmentName: ['', Validators.required],
      year: ['', Validators.required],
      exam: ['', Validators.required],
      subjects: this.fb.array([]),
    })
  }

  ngOnInit(): void {
    this.studentData = this.data.data;
    this.examData = this.data.examData;
    this.subjectsList = this.data.subjects[0].subjects;
    this.createAttendanceList();
  }


  // create subject list
  createAttendanceList(): void {
    const att = this.marksForm.get('subjects') as FormArray;
    this.subjectsList.map((x) => {
      att.push(this.fb.group({
        subjectName: [x, Validators.required],
        mark: ['', Validators.required],
      }))
    });
    this.setFormValues();
  }


  // set form values
  setFormValues() {
    const form = this.marksForm.controls;
    form['studentName'].setValue(this.studentData?.studentName);
    form['examNumber'].setValue(this.studentData?.examNumber);
    form['departmentName'].setValue(this.studentData?.department);
    form['year'].setValue(this.studentData?.year);
    form['exam'].setValue(this.examData?.exam);
  }

  // submit values
  async handleSubmit(): Promise<void> {
    try {
      this.loader.show();
      await this.marksServe.uploadExamMarks(this.marksForm.value);
      this.toast.success('Marks Saved');
      this.dialogRef.close();
    } catch (error: any) {
      console.log(error);
      this.toast.error(error?.error.message)
    } finally {
      this.loader.hide();
    }
  }
}
