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
    return this.firestore.collection("Employees", ref => ref.orderBy('createdAt', 'desc')).snapshotChanges();
    

  }

  deleteEmployee(id:string): Promise<any> {
    return this.firestore.collection("Employees").doc(id).delete()

  }

  getAnEmployee(id: string): Observable<any>{
    return this.firestore.collection("Employees").doc(id).snapshotChanges();
  }

  updateAnEmployee(id:string, data:string): Promise<any>{
    return this.firestore.collection("Employees").doc(id).update(data);
  }
}
