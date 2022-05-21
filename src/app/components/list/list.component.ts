import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  employees: any[] = []
  

  constructor(private dialog: MatDialog, private employeeService: EmployeeService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getEmployees()
  }



  getEmployees(){
    this.employeeService.getEmployees().subscribe(data =>  {
      this.employees = []
      data.forEach((element:any) => {
        this.employees.push({
          id: element.payload.doc.id,
          avatar: '',
          ...element.payload.doc.data()
        })
       
      });

      this.setAvatar();
    })
  }


  deleteEmployee(id:string){
    this.employeeService.deleteEmployee(id).then(() => {
      this.toastr.error('Employee was deleted succesfully!','Deleted employee')
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
          break
         
      }
      
    });
  }


  onSearch(event: KeyboardEvent) {
    var filterValue = (event.target as HTMLInputElement).value;
     
     if(filterValue === "") {this.ngOnInit()}
     if(event.key =="Backspace") { }
     this.employees =this.employees.filter(e => 
      e['first_name'].toLowerCase().indexOf(filterValue.toLowerCase()) !== -1 ||
      e['last_name'].toLowerCase().indexOf(filterValue.toLowerCase()) !== -1 ||
      e['email'].toLowerCase().indexOf(filterValue.toLowerCase()) !== -1 ||
      e['id'].toLowerCase().indexOf(filterValue.toLowerCase()) !== -1 ||
      e['gender'].toLowerCase().indexOf(filterValue.toLowerCase()) !== -1
      
      
      
      );

    
     
     
   }

}
