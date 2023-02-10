import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectsComponent } from './subjects.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { DepartmentSubjectComponent } from './department-subject/department-subject.component';
import { AddDepartmentSubjectComponent } from './add-department-subject/add-department-subject.component';
const materialModules = [
  MatIconModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatDialogModule,
  MatCardModule,
  MatRadioModule,
]


@NgModule({
  declarations: [
    SubjectsComponent,
    AddSubjectComponent,
    DepartmentSubjectComponent,
    AddDepartmentSubjectComponent
  ],
  imports: [
    CommonModule,
    SubjectsRoutingModule,
    ReactiveFormsModule,
    ...materialModules,
  ]
})
export class SubjectsModule { }
