import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlacementRoutingModule } from './placement-routing.module';
import { PlacementComponent } from './placement.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const materialModules = [
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
]

@NgModule({
  declarations: [
    PlacementComponent
  ],
  imports: [
    CommonModule,
    PlacementRoutingModule,
    ReactiveFormsModule,
    ...materialModules,
  ]
})
export class PlacementModule { }
