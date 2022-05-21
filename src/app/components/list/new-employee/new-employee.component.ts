import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';



@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  newEmployee: FormGroup;
  submited = false
 

  constructor(private fb: FormBuilder, private employeeService: EmployeeService, private router: Router, private toastr: ToastrService) {
    this.newEmployee = this.fb.group({
      first_name: ['', Validators.required],
      last_name: [''],
      email: ['',Validators.required],
      gender: ['', Validators.required]
      
    })
   }

  ngOnInit(): void {
  }


  addEmployee(){
    this.submited = true;

    if(this.newEmployee.invalid){
      alert("Except Last_name, all fields are required!")
      return;
    }

    const employee : any = {
      first_name : this.newEmployee.value.first_name,
      last_name : this.newEmployee.value.last_name,
      email : this.newEmployee.value.email,
      gender : this.newEmployee.value.gender,
      createdAt: new Date()
      
    };

    this.employeeService.addEmployee(employee).then(() => {
      this.toastr.success("Employee was added succesfully!", "Added Employee")
      this.router.navigate(["/list"])

    }).catch(error => {
      console.log(error)
    })



    console.log(employee)
  }

}
