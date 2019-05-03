class Element {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }
}

class Park extends Element {
    constructor(name, year, area, numOfTrees) {
        super(name, year);
        this.area = area;
        this.numOfTrees = numOfTrees;
    }
    
    treeDensity() {
        const density = this.numOfTrees / this.area;
        console.log(`${this.name} has a tree density of ${density} trees per square km.`);
    }
}

class Street extends Element {
    constructor(name, year, length, size = 3) {
        super(name, year);
        this.length = length;
        this.size = size;
    }
    
    classifyStreet() {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name}, built in ${this.year} is a ${classification.get(this.size)} street.`);
    }
}

const allParks = [new Park('Green Park', 1987, 0.2, 215),
                 new Park('National Park', 1894, 2.9, 3541),
                 new Park('Oak Park', 1953, 0.4, 949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Blvd', 1982, 2.5, 5)];

function calc(array) {
    const sum = array.reduce((prev, current, index) => prev + current, 0);
    return [sum, sum / array.length];
}


function reportParks(p) {
    console.log('---- PARKS REPORT ----');
    // Density
    p.forEach(elem => elem.treeDensity());
    // Avg Age
    const ages = p.map(elem => 2019 - elem.year);
    const [totalAge, avgAge] = calc(ages);
    console.log(`Our ${p.length} parks have an average age of ${avgAge} years.`);
    // Which park has more than 1000 trees
    const index = p.map(elem => elem.numOfTrees).findIndex(elem => elem >= 1000);
    console.log(`${p[index].name} has more than 1000 trees.`);    
}

function reportStreets(s) {
    console.log('---- PARKS REPORT ----');
    // Total and Avg length of the streets
    const [totalLength, avgLength] = calc(s.map(elem => elem.length));
    console.log(`Our ${s.length} streets have a total length of ${totalLength} kms and an average of ${avgLength} kms.`);
    // Classify the sizes
    s.forEach(elem => elem.classifyStreet());    
}

reportParks(allParks);
reportStreets(allStreets);


