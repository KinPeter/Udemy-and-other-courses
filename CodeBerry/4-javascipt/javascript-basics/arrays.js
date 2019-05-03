var bucketList = ['write a novel', 'learn Italian', 'visit New Zealand', 'try diving'];

//hozzáad a tömb végéhez
bucketList.push('see the Aurora Borealis', 'learn to play guitar', 'parachuting'); 

//hozzáad a tömb elejéhez
bucketList.unshift('become vegetarian', 'move to France for 3 months');

//törli az utolsó elemet
bucketList.pop();

//törli az első elemet
bucketList.shift();

for (var i = 0; i < bucketList.length; i++) {
  console.log(bucketList[i]);
}

var shoppingList = ['cukorka', 'kenyér', 'tej', 'alma'];

//betesz a 2. indexre egy új elemet
shoppingList.splice(2, 0, 'sajt');

//kitöröl a 3. indextől kezdve 1 elemet
shoppingList.splice(3, 1);


var booksToRead = ['Svejk, a derék katona', 
                   'Jane Eyre', 
                   'A Gyűrű Szövetsége', 
                   'A két torony', 
                   'A király visszatér', 
                   'Virágot Algernonnak'];

//kitörli a 2. indextől következő 3 elemet
booksToRead.splice(2,3);

//a 2. indextől kezdve hozzáad két új elemet (nem töröl egyet sem)
booksToRead.splice(2, 0, 'Szerelem a kolera idején', 'Háború és béke');

console.log(booksToRead);
