import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AddAdminComponent } from './add-admin/add-admin.component';
import {MatRadioModule} from '@angular/material/radio'; 
import { ReactiveFormsModule } from '@angular/forms';

const materialModules = [
  MatIconModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatDialogModule,
  MatCardModule,
  MatRadioModule,
]

@NgModule({
  declarations: [
    AdminComponent,
    AddAdminComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    ...materialModules,
  ]
})
export class AdminModule { }
