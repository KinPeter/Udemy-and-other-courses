/************************************************/
// CLASSES

class Passenger {
    constructor(firstName, lastName, fqtvNumber){
        this.firstName = firstName;
        this.lastName = lastName;
        this.fqtvNumber = fqtvNumber;
    }
}

let passenger = new Passenger("Peter", "Kin", 12332245);

console.log(passenger);

/********************************************/
class BMW {
    constructor(make, model, year){
        this.make = make;
        this.model = model;
        this.year = year;
    }
    start() {
        console.log("Start engine");
    }
    stop() {
        console.log("Stop engine");
    }
}

class ThreeSeries extends BMW {
    constructor(make, model, year, cruiseControl) {
        super(make, model, year);
        this.cruiseControl = cruiseControl;
    }
}

class FiveSeries extends BMW {
    constructor(make, model, year, parkingAssist) {
        super(make, model, year);
        this.parkingAssist = parkingAssist;
    }
    start(){ //overriding the inherited function
        console.log("Remote start");
    }
}

let threeSeries = new ThreeSeries("BMW", "328", 2018, true);
let fiveSeries = new FiveSeries("BMW", "535", 2018, true);

console.log(threeSeries.make, threeSeries.model, threeSeries.cruiseControl);
console.log(fiveSeries.make, fiveSeries.model, fiveSeries.parkingAssist);
threeSeries.start();
fiveSeries.start();
fiveSeries.stop();

/***********************************************/
