import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { nanoid } from 'nanoid';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firestore: AngularFirestore) { }



  generateId():string{
    return nanoid()
  }

  addEmployee(employee: any): Promise<any>{
    return this.firestore.collection("Employees").add(employee);
  }
}
