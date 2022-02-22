import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTeacherComponent } from '../teachers/view-teacher/view-teacher.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { DepartmentComponent } from './department.component';
import { ViewDepartmentComponent } from './view-department/view-department.component';

const routes: Routes = [
  { path: '', component: DepartmentComponent },
  { path: 'add-department', component: AddDepartmentComponent },
  { path: 'view-department/:id', component: ViewDepartmentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
