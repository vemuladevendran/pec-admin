import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesComponent } from './notes.component';
import { UploadNotesComponent } from './upload-notes/upload-notes.component';

const routes: Routes = [
  { path: '', component: NotesComponent },
  { path: 'upload-notes', component: UploadNotesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }
