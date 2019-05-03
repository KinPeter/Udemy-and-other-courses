// PROMISES

const getIDs = new Promise(function(resolve, reject) {
    
    setTimeout(function() {
        //resolve is what we get if the call is successful
        resolve([456, 987, 452, 965]);
        reject('There was an error');
        
    }, 1500);
    
});

const getRecipe = function(recID) {
    return new Promise(function(resolve,reject) {
        setTimeout(function(id) {
            const recipe = {
                title: 'Fresh Tomato Pasta',
                publisher: 'Jonas'
            };
            resolve(`${id}: ${recipe.title}`);
        }, 1500, recID);    
    })
}

//then method gets the resolve of the promise as the argument of the callback function:
getIDs.then(function(IDs) {
    console.log(IDs); // = the resolve of the promise
    return getRecipe(IDs[2]);
}).then(function(recipe) {
    console.log(recipe);
});

//catch method gets the reject (if there is an arror) from the promise
getIDs.catch(function(error) {
    console.log(error);
})