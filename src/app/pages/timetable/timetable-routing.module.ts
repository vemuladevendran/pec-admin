import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTimetableComponent } from './add-timetable/add-timetable.component';
import { TimetableComponent } from './timetable.component';

const routes: Routes = [
  { path: '', component: TimetableComponent },
  { path: 'create-timetable', component: AddTimetableComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimetableRoutingModule { }
