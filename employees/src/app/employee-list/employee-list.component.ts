import { Component, OnInit } from '@angular/core';
import { EmployeeServiceClient } from './../services/employee.service.client';
import 'rxjs/RX';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
// tslint:disable-next-line:component-class-suffix
export class EmployeeListComponent implements OnInit {

  employees: [any];

  constructor( private employeeService: EmployeeServiceClient ) { }

  ngOnInit() {
    this.employeeService.findAllEmployees()
      .subscribe({
        next: (employees: [any]) => {
          this.employees = employees;
        }
      });

  }

}
