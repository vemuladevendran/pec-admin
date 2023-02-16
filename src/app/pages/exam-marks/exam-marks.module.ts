import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamMarksRoutingModule } from './exam-marks-routing.module';
import { ExamMarksComponent } from './exam-marks.component';
import { UploadMarksComponent } from './upload-marks/upload-marks.component';
import { SubjectsCardComponent } from './subjects-card/subjects-card.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

const materialModules = [
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatDialogModule
]

@NgModule({
  declarations: [
    ExamMarksComponent,
    UploadMarksComponent,
    SubjectsCardComponent
  ],
  imports: [
    CommonModule,
    ExamMarksRoutingModule,
    ReactiveFormsModule,
    ...materialModules
  ]
})
export class ExamMarksModule { }
