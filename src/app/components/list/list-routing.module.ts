import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { ListComponent } from './list.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';

const routes: Routes = [
  {path:"", component: ListComponent},
  {path:"new-employee", component: NewEmployeeComponent},
  {path:"edit-employee", component: EditEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
