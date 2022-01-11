import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { StudentCardComponent } from './student-card/student-card.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';

@NgModule({
  declarations: [
    StudentsComponent,
    AddStudentComponent,
    ViewStudentComponent,
    StudentCardComponent,
    StudentDetailComponent,
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    ...[
      MatIconModule,
      MatTooltipModule,
      MatFormFieldModule,
      MatOptionModule,
      MatSelectModule,
      MatInputModule,
      MatDialogModule,
    ],
  ],
})
export class StudentsModule {}
