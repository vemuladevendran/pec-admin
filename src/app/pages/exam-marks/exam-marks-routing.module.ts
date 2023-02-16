import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamMarksComponent } from './exam-marks.component';
import { UploadMarksComponent } from './upload-marks/upload-marks.component';

const routes: Routes = [
  { path: '', component: ExamMarksComponent },
  { path: 'upload', component: UploadMarksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamMarksRoutingModule { }
