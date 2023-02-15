import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnnouncementRoutingModule } from './announcement-routing.module';
import { AnnouncementComponent } from './announcement.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';

const materialModules = [
  MatFormFieldModule,
  MatInputModule,
]

@NgModule({
  declarations: [
    AnnouncementComponent,
    CreateAnnouncementComponent
  ],
  imports: [
    CommonModule,
    AnnouncementRoutingModule,
    ReactiveFormsModule,
    ...materialModules
  ]
})
export class AnnouncementModule { }
