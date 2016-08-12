export class Temp {
    zipCode: string;
    firstDate: string;
    secondDate: string;

    firstData : any;
    secondData: any;
    
    metric: Metric;
    highlow: HighLow;

    constructor( ) {
        this.zipCode = '';
        this.firstDate = ''; 
        this.secondDate = ''; 
    }
    
    getMetric() {
        switch (this.metric){
            case Metric.C: return "Celsius";
            case Metric.F: return "Fahrenheit";
            default: return "";
        }
    }
    getAverage(): number {
        if  (this.firstData != null &&  this.secondData != null) {
            let tempOne: number = this.getTemp(this.firstData);
            let tempTwo : number = this.getTemp(this.secondData);

            if ( tempOne !== null && tempTwo !== null ) {
                return (tempOne + tempTwo) / 2
            }
        }
        return null;
    }

    addData(data: any[]) {
            this.firstData = data[0];
            this.secondData =  data[1];
    }

    getTemp(data: any) : number { // return data based on if high or low c or f
        let num = this.metric + this.highlow; 
        switch (num) {
            case 2: 
                var s = data.weather[0].mintempC;
                return +s;
            case 3:
                var s = data.weather[0].mintempF;
                return +s;
            case 4:
                var s =  data.weather[0].maxtempC;
                return +s;
            case 5: 
                var s = data.weather[0].maxtempF;
                return +s;
            default: 
                return null;
        }
    }


}


export enum Metric {
    C, 
    F
}

export enum HighLow {
    Low = 2 ,
    High = 4
}