
import { Http, Response } from '@angular/http';

import 'rxjs/RX';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';

@Injectable()
export  class EmployeeServiceClient {
    // tslint:disable-next-line:no-trailing-whitespace
    
    constructor( private http: Http) {

    }
    findAllEmployees: any () {
        const url = 'http://localhost:3000/api/employee';
        this.http.get(url)
            .map(
                 (response: Response) => {
                     response.json();
                }
            );
    }

}
