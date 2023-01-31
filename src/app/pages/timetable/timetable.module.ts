import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimetableRoutingModule } from './timetable-routing.module';
import { TimetableComponent } from './timetable.component';
import { AddTimetableComponent } from './add-timetable/add-timetable.component';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';

const materialModules = [
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatCardModule,
]

@NgModule({
  declarations: [
    TimetableComponent,
    AddTimetableComponent
  ],
  imports: [
    CommonModule,
    TimetableRoutingModule,
    ReactiveFormsModule,
    ...materialModules
  ]
})
export class TimetableModule { }
