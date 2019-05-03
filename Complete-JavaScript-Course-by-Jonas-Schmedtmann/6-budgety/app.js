/////////////////////////////////////////////
// BUDGET CONTROLLER MODULE
var budgetController = (function() {
    
    //function constructor for expenses
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    //add method to Expense prototype to calculate percentage of total income
    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100); 
        } else {
            this.percentage = -1;
        }    
    };
    
    //add method to Expense prototype to return the percentage
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };
    
    //function constructor for incomes
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    //base data structure for every data
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0,
        },
        budget: 0,
        percentage: -1
    };
    
    //method to calculate totals either of incomes or of expenses, then put it in the data str.
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(current) {
            sum += current.value;
        });
        data.totals[type] = sum;
    };
    
/****************************
PUBLIC METHODS             */    
    return {
        //public method to add new item to the data
        addItem: function(type, descr, val) {
            var newItem, ID;
            
            //set the ID by checking the last item's ID in the array
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            //check if the type is expense or income, create new object accordingly
            if (type === 'exp') {
                newItem = new Expense(ID, descr, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, descr, val);
            }
            
            //push it to the data structure and return the new element
            data.allItems[type].push(newItem);
            return newItem;
        },
        
        //method to delete item from the data structure
        deleteItem: function(type, id) {
            var IDs, index;
            //loop through the array of given type to find the ID
            IDs = data.allItems[type].map(function(current) {
                return current.id;
            });
            //get the index of the ID in the array
            index = IDs.indexOf(id);
            //delete the item from the data structure array if we found the index
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }   
        },
                
        //method to calculate the budget 
        calculateBudget: function() {
            //sum total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            //calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }            
        },
        
        //method to calculate percentage for each expense
        calculatePercentages: function() {
            //loop through the array and calculate each percentage
            data.allItems.exp.forEach(function(current) {
                current.calcPercentage(data.totals.inc);
            });
        },
        
        //method to return the percentages and then pass to the UI controller
        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(current) {
                return current.getPercentage();
            })
            return allPerc;
        },
        
        //method to return the budget and then pass to UI controller
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: function() {
            console.log(data);
        }
    }
    
})();



/////////////////////////////////////////////
// UI CONTROLLER MODULE
var UIController = (function() {
    
    //save DOM strings to a variable
    var DOMstrings = {
        inputType: '.add__type',
        inputDescr: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    
    //function to format the number in the html like + 1,256.00
    var formatNumber = function(num, type) {
        var numSplit, int, dec, sign;
        num = Math.abs(num); //absolute value
        //to get to 2 decimals
        num = num.toFixed(2); //now a string with 2 decimals
        //split the string to integer and decimals
        numSplit = num.split('.');
        int = numSplit[0];
        dec = numSplit[1];
        //add comma separator to the integer part
        if (int.length > 6) {
            int = int.substr(0, int.length-6) + ',' + int.substr(int.length-6, 3)+ ',' + int.substr(int.length-3, 3);
        } else if (int.length > 3) {
            int = int.substr(0, int.length-3) + ',' + int.substr(int.length-3, 3);
        }
        //determine the prefix sign (+/-) with ternary operator
        type === 'exp' ? sign = '-' : sign = '+';
        //return the formatted number as string
        return sign + ' ' + int + '.' + dec;
    };
    
    //function to loop through a node list and apply a callback function on it
    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };
    
/****************************
PUBLIC METHODS             */
    return {
        //public method to get field input data
        getInput: function() {
            return {
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
                description: document.querySelector(DOMstrings.inputDescr).value,
                type: document.querySelector(DOMstrings.inputType).value // 'inc' or 'exp'
            }
        },
        
        //method to expose the domstrings variable
        getDOMstrings: function() {
            return DOMstrings;
        },
        
        //method to add the input to the list on the UI
        addListItem: function(obj, type) {
            var html, newHtml, element;
            
            //create HTML string with placeholder text depending on the type 'exp' or 'inc'
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div> </div>'
            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            }
            
            //replace the placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
            //insert the HTML code into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        
        //method to remove the list item HTML from the DOM
        deleteListItem: function(selectorID) {
            var element;
            //get the element to remove by ID
            element = document.getElementById(selectorID);
            //remove the item by getting to it's parent
            element.parentNode.removeChild(element);
        },
        
        //method to clear the fields after entering new data
        clearFields: function() {
            //find and get the fields by DOM strings, put them in an array
            var fields, fieldsArray;
            fields = document.querySelectorAll(DOMstrings.inputDescr + ', ' + DOMstrings.inputValue);
            fieldsArray = Array.prototype.slice.call(fields);
            //loop through the array and clear the values
            fieldsArray.forEach(function(current, index, array) {
                current.value = "";
            });
            //set the focus back to the first field
            fieldsArray[0].focus();
        },
        
        //method to update the html of budget fields
        displayBudget: function(obj) {
            var type;
            //if budget is negative or positive, get type parameter for formatNumber function
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            //update the HTMLs
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + "%";
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = "---";
            }
        },
        
        //method to update the html of each expense percentages
        displayPercentages: function(percentages) {
            var fields = document.querySelectorAll(DOMstrings.expensesPercentageLabel); //returns node list
            //call the loop function and specify the callback to set html of each field to the according percentage
            nodeListForEach(fields, function(current, index) {
                if (percentages[index] >0 ) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },
        
        //method to display the current month and year
        displayMonth: function() {
            var now, year, month, allMonths;
            allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            now = new Date();
            year = now.getFullYear();
            month = now.getMonth(); // zero based!
            document.querySelector(DOMstrings.dateLabel).textContent = allMonths[month] + ' ' + year;      
        },
    
        //method to change the color of the input fields depending on the type of exp or inc
        changedType: function() {
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescr + ',' +
                DOMstrings.inputValue);
            nodeListForEach(fields, function(current) {
                current.classList.toggle('red-focus');
            });
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        }
    }
})();



/////////////////////////////////////////////
// GLOBAL APP CONTROLLER MODULE
var controller = (function(budgetCtrl, UICtrl) {
    
    //function to set up event listeners
    var setupEventListeners = function() {
        //import DOM strings from UI controller
        var DOM = UICtrl.getDOMstrings();
        //event listener for button
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        //event listener for ENTER key 
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
        //event listener for all delete buttons in the container class
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        //event listener for the change type input
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);     
    };
    
    //function to update the budget
    var updateBudget = function() {
        //1. calculate the budget
        budgetCtrl.calculateBudget();
        
        //2. return the budget
        var budget = budgetCtrl.getBudget();
        
        //6. display the budget        
        UICtrl.displayBudget(budget);
    };
    
    var updatePercentages = function() {
        //1. calculate percentages
        budgetCtrl.calculatePercentages();
        
        //2. read percentages from budget controller
        var percentages = budgetCtrl.getPercentages();
        
        //3. update the UI with new percentages
        UICtrl.displayPercentages(percentages);
    };
        
    //function to call when the input button or ENTER is pressed
    var ctrlAddItem = function() {
        var input, newItem;
        
        //1. get field input data
        input = UICtrl.getInput();
        
        //field validation
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //3. add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            //4. clear the fields
            UICtrl.clearFields();

            //5. calculate and update budget
            updateBudget();
            
            //6. calculate and update percentages
            updatePercentages();
        }
    };
    
    //function to delete an item upon click of delete button, by getting it's id
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;
        //get the item id by getting the html element's id where the click event happend
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        //if there is an ID on the html element...
        if (itemID) {
            //split html id string like "income-1" to ["income", "1"] array
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            //1. delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);
            
            //2. delete the item from the UI
            UICtrl.deleteListItem(itemID);
            
            //3. uptdate and show the new budget
            updateBudget();
            
            //4. calculate and update percentages
            updatePercentages();
        }    
    };
    
/****************************
PUBLIC METHODS             */   
    return {
        init: function() {
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
            UICtrl.displayMonth();
        }
    }  
    
})(budgetController, UIController);


controller.init();



