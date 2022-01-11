import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentsComponent } from './students.component';
import { ViewStudentComponent } from './view-student/view-student.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: 'add-student', component: AddStudentComponent },
  { path: 'viwe-student', component: ViewStudentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
