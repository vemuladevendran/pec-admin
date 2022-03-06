import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentCardComponent } from './student-card/student-card.component';
import { ReactiveFormsModule } from '@angular/forms';

const materialModules = [
  MatIconModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
]

@NgModule({
  declarations: [
    StudentsComponent,
    AddStudentComponent,
    StudentCardComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ReactiveFormsModule,
    ...materialModules,
  ],
})
export class StudentsModule { }
