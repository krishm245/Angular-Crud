import { Component,OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmpDetailsComponent } from './emp-details/emp-details.component';
import { EmpServiceService } from './services/emp-service.service';
import { Employee } from './types/Employee';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud-app-1.0';

  employees!:Employee[] 

  constructor(
    public _dialogService: MatDialog,
    public _empService: EmpServiceService
    ){}
    
    dataSource! : MatTableDataSource<any> ;
  

  //@ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dob','gender','role','action'];


 

  ngOnInit(): void {
      this._empService.getEmployees().subscribe({
        next:(val:any)=>{
          this.employees = val
          this.dataSource= new MatTableDataSource(this.employees)
          console.log("Employees loaded",val)
        },
        error:(err)=>console.log(err)
      })
  }

  openAddEmployeeDetailsDialogBox() {
    const dialogRef = this._dialogService.open(EmpDetailsComponent)
    dialogRef.afterClosed().subscribe({
      next:(val:any)=>{
        if(val){
          this._empService.getEmployees().subscribe({
            next:(val:any)=>{
              this.employees = val
              this.dataSource= new MatTableDataSource(this.employees)
              console.log("Employees loaded",val)
            },
            error:(err)=>console.log(err)
          })
        }
      }
    })
  }

  deleteEmployee(id:number) {
    this._empService.deleteEmployee(id).subscribe({
      next:(val:any)=>{
        if(val){
          this._empService.getEmployees().subscribe({
            next:(data:any)=>{
              this.employees = data
              this.dataSource= new MatTableDataSource(this.employees)
              alert("Employee deleted")
            },
            error:(err)=>console.log(err)
          })
        }
      },
      error:(err)=>console.log(err)
    })
  }

  editEmpDetails(employee:any){
   const dialogRef=  this._dialogService.open(EmpDetailsComponent,{
      data:employee
    })
    dialogRef.afterClosed().subscribe({
      next:(val:any)=>{
        if(val){
          this._empService.getEmployees().subscribe({
            next:(val:any)=>{
              this.employees = val
              this.dataSource= new MatTableDataSource(this.employees)
              console.log("Employees loaded",val)
            },
            error:(err)=>console.log(err)
          })
        }
      }
    })
  }  
}
