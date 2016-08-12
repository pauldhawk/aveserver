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
    errorMessage: boolean;
    notallDataFilledIn: boolean;

    constructor(private _getTempData: TempService) { }

    ngOnInit() {
        this.temp = new Temp();
        this.dataReceived = false;
    }

    allValid(){ // simple check to make sure all data filled out
        if (this.temp.zipCode == '' || this.temp.firstDate == '' || this.temp.secondDate == '' 
            || this.temp.metric == null || this.temp.highlow == null) {
                return false;
            }
        return true;
    }

    getAverage() {
        if (this.allValid() == false) { this.notallDataFilledIn = true; }
        else {
            this.notallDataFilledIn = false;
            let a = this._getTempData.getData(this.temp.zipCode, this.temp.firstDate);
            let b = this._getTempData.getData(this.temp.zipCode, this.temp.secondDate);
            Promise.all([a,b])
                .then(
                    data => {   this.temp.addData(data);
                                this.errorMessage = false;
                                this.dataReceived = true;
                    },
                    err => this.errorMessage = true )
                .then(
                    () =>  this.average = this.temp.getAverage()) 
                .catch( () => this.errorMessage = true );
        }
    }
    
    changeUnits(val: String) {
        switch (val) {
            case "f":
                this.temp.metric = Metric.F; break;
            case "c":
                this.temp.metric = Metric.C; break;
            default:
                this.temp.metric = null;
        }
        if (this.dataReceived == true) { this.average = this.temp.getAverage();}
    }

    changeHighLow(val: String) {
        switch (val) {
            case "h":
                this.temp.highlow = HighLow.High; break;
            case "l":
                this.temp.highlow = HighLow.Low; break;
            default: this.temp.highlow = null;
        }
        console.log(this.temp.highlow);
        if (this.dataReceived == true) { this.average = this.temp.getAverage();}
    }
    reset() {
        this.temp = new Temp();
    }



}