import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeacherComponent } from './add-teacher/add-teacher.component';
import { TeachersComponent } from './teachers.component';

const routes: Routes = [
  { path: '', component: TeachersComponent },
  { path: 'add-teacher', component: AddTeacherComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeachersRoutingModule { }
