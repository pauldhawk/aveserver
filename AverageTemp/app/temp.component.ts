import { Component, OnInit } from '@angular/core';
import { Temp, Metric, HighLow } from './temp.model';
import { TempService } from './temp.service';

@Component({
    moduleId: module.id,
    selector: 'temp',
    templateUrl: 'temp.component.html',
    providers: [TempService]
})

export class TempComponent implements OnInit {
    temp: Temp;
    average: number;
    dataReceived: boolean; // use this to change the average when data has been recived and user changes units or highlow

    constructor(private _getTempData: TempService) { }

    ngOnInit() {
        this.temp = new Temp();
        this.dataReceived = false;
        this.setFakeData(); /// for testing
    }

    setFakeData() {
        this.temp.highlow = HighLow.High;
        this.temp.metric = Metric.C;
        this.temp.firstDate = '2016-08-02';
        this.temp.secondDate = '2016-08-01';
        this.temp.zipCode = '60618';
    }

    getAverage() {
        if (this.temp.dataFilledIn() == false) { this.temp.notallDataFilledIn = true; }
        else {
            this.temp.notallDataFilledIn = false;
            var a = this._getTempData.getData(this.temp.zipCode, this.temp.firstDate);
            var b = this._getTempData.getData(this.temp.zipCode, this.temp.secondDate);
            Promise.all([a,b])
                .then(
                    data => {   this.temp.addData(data);
                                this.temp.errors = false;
                                this.dataReceived = true;
                    },
                    err => this.temp.errors = true )
                .then(
                    () =>  this.average = this.temp.average()) 
                .catch( () => this.temp.errors = true );
        }
    }
    
    changeUnits(val: String) {
        this.temp.setMetric(val);

        if (this.dataReceived == true && this.temp.metric != null ){ 
            this.average = this.temp.average();
         }
    }

    changeHighLow(val: String) {
        this.temp.setHighLow(val);
        
        if (this.dataReceived == true && this.temp.highlow != null) { 
            this.average = this.temp.average();
        }
    }
    
    reset() {
        this.temp = new Temp();
    }
}