
// import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { Response } from '@angular/http';
// import 'rxjs/RX';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

// import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';


@Injectable()
export class EmployeeServiceClient {
    // tslint:disable-next-line:no-trailing-whitespace

    findAllEmployees () {
        const url = 'http://localhost:3000/api/employees';
        return this.http.get(url)
          .map(
            response => response.json()
          );
            // .map(
            //      (response: Response) => {
            //       return  response.json();
            //     }
            // );
    }
    constructor( private http: Http) {

    }

}
