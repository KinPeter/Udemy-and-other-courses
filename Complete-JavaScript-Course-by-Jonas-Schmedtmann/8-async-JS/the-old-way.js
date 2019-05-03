// The old way


function getRecipe() {
    setTimeout(() => {
        const recipeID = [456, 987, 452, 965];
        console.log(recipeID);
        
        setTimeout((id) => {
            const recipe = {
                title: 'Fresh Tomato Pasta',
                publisher: 'Jonas'
            }
            console.log(`${id}: ${recipe.title}`);
            
            setTimeout((publisher) => {
                const recipe2 = {
                    title: 'Italian Pizza',
                    publisher: 'Jonas'
                };
                console.log(recipe2);            
        
            }, 1500, recipe.publisher);
        }, 1500, recipeID[2]);
    }, 1500)
}

getRecipe();