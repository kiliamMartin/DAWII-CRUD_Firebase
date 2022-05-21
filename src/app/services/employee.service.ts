import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private firestore: AngularFirestore) { }



  addEmployee(employee: any): Promise<any>{
    return this.firestore.collection("Employees").add(employee);
  }

  getEmployees(): Observable<any>{
    console.log(this.firestore.collection("Employees"))
    return this.firestore.collection("Employees", ref => ref.orderBy('createdAt', 'desc')).snapshotChanges();
    

  }

  deleteEmployee(id:string): Promise<any> {
    return this.firestore.collection("Employees").doc(id).delete()

  }
}
