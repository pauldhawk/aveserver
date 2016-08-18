export class Temp {
    zipCode: string;
    firstDate: string;
    secondDate: string;

    firstData : any;
    secondData: any;
    
    metric: Metric;
    highlow: HighLow;
    errors: boolean;
    notallDataFilledIn: boolean;

    constructor( ) {
        this.zipCode = '';
        this.firstDate = ''; 
        this.secondDate = ''; 
    }
    
    metricToString() {
        switch (this.metric){
            case Metric.C: return "Celsius";
            case Metric.F: return "Fahrenheit";
            default: return "";
        }
    }

    average(): number {
        if  (this.firstData != null &&  this.secondData != null) {

            var tempOne: number = this.getTemp(this.firstData);
            var tempTwo : number = this.getTemp(this.secondData);

            if ( tempOne !== null && tempTwo !== null ) {
                return (tempOne + tempTwo) / 2
            }
        }
        return null;
    }

    highlowToSting() : String{
        switch (this.highlow) {
            case 2: 
            return "low";
            case 4:
                return "high";
            default: 
                return "error getting high / low";
        }
    }

    addData(data: any[]) {
        this.firstData = null;
        this.secondData = null;
        this.firstData = data[0];
        this.secondData =  data[1];
        console.log(this.firstData.weather[0].mintempC);
        console.log(this.secondData.weather[0].mintempC);
    }

    setMetric(val: String ) {
       switch (val) {
            case "f":
                this.metric = Metric.F; break;
            case "c":
                this.metric = Metric.C; break;
            default:
                this.metric = null;
        }
    }

    setHighLow (val : String) {
        switch (val) {
            case "h":
                this.highlow = HighLow.High; break;
            case "l":
                this.highlow = HighLow.Low; break;
            default: this.highlow = null;
        }
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

    dataFilledIn (): Boolean {
        if (this.zipCode == '' || this.firstDate == '' || this.secondDate == '' 
            || this.metric == null || this.highlow == null) {
                return false;
            }
        return true;
    }

}


export enum Metric {
    C = 0, 
    F
}

export enum HighLow {
    Low = 2 ,
    High = 4
}