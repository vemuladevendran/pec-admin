import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnnouncementComponent } from './announcement.component';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';

const routes: Routes = [
  { path: '', component: AnnouncementComponent },
  { path: 'create', component: CreateAnnouncementComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnnouncementRoutingModule { }
