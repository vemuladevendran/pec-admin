import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamMarksComponent } from './exam-marks.component';
import { InternalMarksComponent } from './internal-marks/internal-marks.component';
import { ShowMarksComponent } from './show-marks/show-marks.component';
import { UploadMarksComponent } from './upload-marks/upload-marks.component';

const routes: Routes = [
  { path: '', component: ExamMarksComponent },
  { path: 'upload', component: UploadMarksComponent },
  { path: 'internal', component: InternalMarksComponent },
  { path: 'internal/details/:id', component: ShowMarksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamMarksRoutingModule { }
