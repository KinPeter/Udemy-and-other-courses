// ASYNC AWAIT

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
};

const getRelated = function(publisher) {
    return new Promise(function(resolve, reject) {
        setTimeout(function(publ) {
            const recipe = {
                title: 'Italian Pizza',
                publisher: 'Jonas'
            };
            resolve(`${publ}: ${recipe.title}`);
        }, 1500, publisher);
    })
};


// async function keeps running in the background and waits for the promises inside it to resolve
async function getRecipesAW() {
    const IDs = await getIDs; //receives the resolve value of the promise
    console.log(IDs);
    
    const recipe = await getRecipe(IDs[2]);
    console.log(recipe);
    
    const related = await getRelated('Jonas');
    console.log(related);
    
    return recipe;
}
//using .then() on async function we can get back it's returned result:
getRecipesAW().then(result => console.log(`The best recipe is ${result}!`));

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

