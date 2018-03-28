import { Component, OnInit } from '@angular/core';
import { EmployeeServiceClient } from './../services/employee.service.client';
import 'rxjs/RX';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor( private employeeService: EmployeeServiceClient ) { }

  ngOnInit() {
    const a = this.employeeService.findAllEmployees();
  }

}
