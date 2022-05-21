import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  id: string | null;
  modEmployee: FormGroup

  constructor(
      private toastr: ToastrService,
      private aRoute: ActivatedRoute,
      private router: Router,
      private employeeService: EmployeeService,
      private fb: FormBuilder) 
      {
        this.modEmployee = this.fb.group ({
          first_name: ['', Validators.required],
          last_name: [''],
          email: ['',Validators.required],
          gender: ['', Validators.required]
        })
        this.id = this.aRoute.snapshot.paramMap.get('id')
        
      }

  ngOnInit(): void {
    this.getEmployeeData()
  }

  getEmployeeData(){
    if(this.id !== null) {
      this.employeeService.getAnEmployee(this.id).subscribe(data => {
        this.modEmployee.setValue({
          first_name: data.payload.data()['first_name'],
          last_name: data.payload.data()['last_name'],
          email: data.payload.data()['email'],
          gender: data.payload.data()['gender']
        })
      })
    }
  }

  editEmployee(){
    const employee : any = {
      first_name : this.modEmployee.value.first_name,
      last_name : this.modEmployee.value.last_name,
      email : this.modEmployee.value.email,
      gender : this.modEmployee.value.gender,      
    };
    if(this.modEmployee.invalid){
      alert("Except Last name, all fields are required!")
      return;
    }

    if(this.id !== null){
      this.employeeService.updateAnEmployee(this.id, employee).then(() => {
          this.toastr.info('Employee updated successfully!', 'Updated Employee')
      })
      this.router.navigate(["/list"])
    
    }

    
  }

}
