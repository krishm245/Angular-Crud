import {AfterViewInit, Component, Input, ViewChild,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Employee } from '../types/Employee';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css'],
})
export class EmpListComponent implements OnInit, AfterViewInit {

  @Input() employee!: Employee[];

  dataSource! : MatTableDataSource<any> ;
  

  //@ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','dob','gender','role'];

  ngOnInit(): void {
      console.log(this.employee)
  }
  

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource= new MatTableDataSource(this.employee)
    console.log("Datasource",this.dataSource)
    console.log("Employee Data",this.employee)
  }


}
