import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../types/Employee';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpServiceService {

  constructor(private _http: HttpClient) {

   }

   addEmployee(employee:Employee){
    return this._http.post(" http://localhost:3000/employees",employee)
   }

   getEmployees():Observable<any>{
     return this._http.get("http://localhost:3000/employees")
   }

   deleteEmployee(id:number):Observable<any>{
    return this._http.delete(`http://localhost:3000/employees/${id}`)
  }

  updateEmployee(id:number, employee:any):Observable<any>{
    return this._http.put(`http://localhost:3000/employees/${id}`,employee)
  }

}
