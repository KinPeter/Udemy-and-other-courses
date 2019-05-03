var john = {
    name: "John's family",
    bills: [124, 48, 268, 180, 42],
    tips: [],
    totals: [],
    calcTip: function() {
        for (var i = 0; i < this.bills.length; i++) {
            var percent;
            var bill = this.bills[i];
            switch (true) {
                case bill < 50 :
                    percent = .2;
                    break;
                case bill >= 50 && bill < 200:
                    percent = .15;
                    break;
                default:
                    percent = .1;
            }
            this.tips.push(bill * percent);
            this.totals.push(bill + this.tips[i]);
        }
    }
}

var mark = {
    name: "Mark's family",
    bills: [77, 375, 110, 45],
    tips: [],
    totals: [],
    calcTip: function() {
        for (var i = 0; i < this.bills.length; i++) {
            var percent;
            var bill = this.bills[i];
            switch (true) {
                case bill < 100 :
                    percent = .2;
                    break;
                case bill >= 100 && bill < 300:
                    percent = .1;
                    break;
                default:
                    percent = .25;
            }
            this.tips.push(bill * percent);
            this.totals.push(bill + this.tips[i]);
        }
    }
}

john.calcTip();
console.log(john);
mark.calcTip();
console.log(mark);


function calcAvgTips(tips) {
    var sumOfTips = 0;
    for (var i = 0; i < tips.length; i++) {
        sumOfTips += tips[i];
    }
    return sumOfTips / tips.length
}

john.average = calcAvgTips(john.tips);
mark.average = calcAvgTips(mark.tips);

if (john.average > mark.average) {
    console.log(john.name + " paid more tips on average with an amount of " + john.average + " over " + mark.name + " who paid " + mark.average);
} else {
    console.log(mark.name + " paid more tips on average with an amount of " + mark.average + " over " + john.name + " who paid " + john.average);
}
































