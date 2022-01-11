import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { TeachersComponent } from './teachers.component';
import { ViewTeacherComponent } from './view-teacher/view-teacher.component';

const routes: Routes = [
  { path: '', component: TeachersComponent },
  { path: 'add-teacher', component: AddTeacherComponent },
  { path: 'viwe-teacher', component: ViewTeacherComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
