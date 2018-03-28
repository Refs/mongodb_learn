
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/RX';
import { Injectable } from '@angular/core';

@Injectable()
export  class EmployeeServiceClient {
    // tslint:disable-next-line:no-trailing-whitespace
    
    findAllEmployees () {
        const url = 'http://localhost:3000/api/employees';
        return this.http.get(url)
            .map(
                 (response: Response) => {
                  return  response.json();
                }
            );
    }
    constructor( private http: HttpClient) {

    }

}
