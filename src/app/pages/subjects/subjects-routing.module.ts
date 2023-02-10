import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDepartmentSubjectComponent } from './add-department-subject/add-department-subject.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { DepartmentSubjectComponent } from './department-subject/department-subject.component';
import { SubjectsComponent } from './subjects.component';

const routes: Routes = [
  { path: '', component: SubjectsComponent },
  {
    path: 'add-subject',
    component: AddSubjectComponent
  },
  {
    path: 'department-subject',
    component: DepartmentSubjectComponent,
  },
  {
    path: 'add-department-subject',
    component: AddDepartmentSubjectComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }
