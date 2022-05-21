import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [
    ListComponent,
    NavbarComponent,
    NewEmployeeComponent,
    EditEmployeeComponent,
    DeleteDialogComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    SharedModule
  ]
})
export class ListModule { }
