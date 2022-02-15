import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { SubjectsComponent } from './subjects.component';

const routes: Routes = [
  { path: '', component: SubjectsComponent },
  {
    path: 'add-subject',
    component: AddSubjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule { }