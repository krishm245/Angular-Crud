import { Component, Inject, OnInit } from '@angular/core';
import { EmployeeRole } from './EmpoyeeRole';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpServiceService } from '../services/emp-service.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';



@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {

    empForm: FormGroup;
    roles : string[] = ["Manager", "Junior Developer","Senior Developer","Lead QA Analyst"];

    constructor(
      private _fb: FormBuilder,
      private _empService:EmpServiceService,
      private _dialogRef:MatDialogRef<EmpDetailsComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any
      ){
      this.empForm = _fb.group({
        firstName:"",
        lastName:"",
        email:"",
        dob:"",
        gender:"",
        role:""
      })
    }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

    onFormSubmit(){
      if(this.empForm.valid){
        if(this.data){
          this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
            next:(val:any)=>{
              alert("Employee Details updated")
              this._dialogRef.close(true)
            },
            error:(val:any)=>{
              console.log("Error updating employee")
            }
          })
        }else{   
          this._empService.addEmployee(this.empForm.value).subscribe({
            next:(data:any) =>{
                alert("Employee added successfully")
                this._dialogRef.close(true)
            },error:(err)=>{
              console.log("Error adding employee",err)
            }
          })
        }
        }
    }
}
