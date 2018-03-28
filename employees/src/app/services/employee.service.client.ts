
import { Http, Response } from '@angular/http';

import 'rxjs/RX';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export  class EmployeeServiceClient {
    // tslint:disable-next-line:no-trailing-whitespace
    
    findAllEmployees () {
        const url = 'http://localhost:3000/api/employee';
        this.http.get(url)
            .map(
                 (response: Response) => {
                    return response.json() as Observable<any> ;
                }
            );
    }
    constructor( private http: Http) {

    }

}
