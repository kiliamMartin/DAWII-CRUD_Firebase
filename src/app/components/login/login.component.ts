import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar, private router: Router) {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      pass: ['', Validators.required]
    }) 
    
  }

  ngOnInit(): void {
  }

  login() {
    const user = this.form.value.user;
    const pass = this.form.value.pass;
    
    if(user == "admin" && pass == "admin"){
      this.router.navigate(['list'])
    }else{
      this.errorHandling()
    }
    
  }

  errorHandling(){
    this.snackBar.open("User or password are incorrect", "", {
      duration: 6000,
      horizontalPosition:"center",
      verticalPosition:"top"
      
    })
  }

}
