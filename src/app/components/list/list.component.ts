import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee.service';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  employees: any[] = []

  constructor(private dialog: MatDialog, private employeeService: EmployeeService) {

  }

  ngOnInit(): void {
    this.getEmployees()
  }

  onSearch(event : KeyboardEvent){

  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe(data =>  {
      this.employees = []
      data.forEach((element:any) => {
        //console.log(element);
        // console.log(element.payload.doc.id)    
        // console.log(element.payload.doc.data())
        this.employees.push({
          id: element.payload.doc.id,
          avatar: '',
          ...element.payload.doc.data()
        })
       
      });
      this.setAvatar();
      console.log(this.employees)
    })
  }


  deleteEmployee(id:string){
    this.employeeService.deleteEmployee(id).then(() => {
      console.log("deleted")
    }).catch(error => {
      console.log(error)
    })
  }



  private setAvatar():void{
    var avatar: string = "assets/images/female.png"
    this.employees.forEach((e:any) => {
      e.avatar = avatar
      if(e.gender == "Male"){e.avatar = "assets/images/male.png" };
    })
  }


  openDeleteDialog(id: string) {
    const myCompDialog = this.dialog.open(DeleteDialogComponent);
    myCompDialog.afterClosed().subscribe((result) => {
      switch (result) {
        case 'cancel':
          break 
        case "delete":
          this.deleteEmployee(id)
          break
        
        default:
          console.log("undefined")
          break
         
      }
      
    });
  }

}
