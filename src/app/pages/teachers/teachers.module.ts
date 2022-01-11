import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeachersRoutingModule } from './teachers-routing.module';
import { TeachersComponent } from './teachers.component';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';


@NgModule({
  declarations: [
    TeachersComponent,
    AddTeacherComponent,
    ViewTeacherComponent
  ],
  imports: [
    CommonModule,
    TeachersRoutingModule
  ]
})
export class TeachersModule { }
