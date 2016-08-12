import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Temp } from './temp.model';



@Injectable()
export class TempService {

    constructor(private http: Http) { }

    getUrl(zip: string, date: string): string {
        var url = "https://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=9b370cc71d7b47eda0a185723161108&includelocation=yes&format=json&tp=24";
        var q = `&q=${zip}&dateP=${date}`
        var result = url+q;
        console.log(result);
        return result;
    }

    getData(zip: string, date: string): Promise<any> {
        var url = this.getUrl(zip, date); 
        return this.http.get(url)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
    }
 
    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}