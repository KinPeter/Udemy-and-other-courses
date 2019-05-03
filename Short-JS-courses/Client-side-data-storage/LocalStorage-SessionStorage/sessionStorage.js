window.onload = () => {

//-------- Storing data - 3 ways --------
// sessionStorage has exactly the same functions as localStorage, but
// items expire upon closing the browser

    // sessionStorage.setItem(key, value)
    sessionStorage.setItem('item key', 'item Value')

    // object notation
    sessionStorage.keyItem = 'new item value'
    // arrow notation
    sessionStorage['key item 2'] = 'another item value'


//-------- Retrieving data --------

    // sessionStorage.getItem(key)
    console.log( sessionStorage.getItem('item key') ) 
    console.log( sessionStorage.getItem('item key asd') ) // if not existing returns null

    // object notation
    console.log( sessionStorage.keyItem )
    console.log( sessionStorage.keyItemAsd ) // if not existing returns undefined
    // arrow notation
    console.log( sessionStorage['key item 2'] )
    console.log( sessionStorage['key item 3'] ) // if not existing returns undefined


//-------- Removing data --------

    // sessionStorage.removeItem(key)
    sessionStorage.removeItem('itemKey')


//-------- Removing ALL data --------

    // sessionStorage.clear()


//-------- More --------

    // .length property
    console.log( sessionStorage.length )

    // sessionStorage.key(index)
    console.log( sessionStorage.key(0) ) // returns the key by index (number of items)

    // use the above to get an array of the stored item keys
    let keys = []
    for (let i = 0; i < sessionStorage.length; i++) {
        keys.push( sessionStorage.key(i) )
    }
    console.log(keys)


//-------- Storing OBJECTS in sessionStorage --------

    let person = {
        name: 'Peter',
        age: 33,
        country: 'Hungary',
        favorites: [{food: 'korean', number: 13, color: 'blue'}, {food: 'japanese', number: 12, color: 'orange'}]
    }

    // create a string of the object by JSON.stringify()
    let personStr = JSON.stringify(person)
    console.log(person)
    console.log(personStr)

    // store it as a string
    sessionStorage.setItem('person', personStr)

    // get the item as string
    let resultStr = sessionStorage.getItem('person')
    // parse it to JS object
    let result = JSON.parse( resultStr )

    console.log(result)
    console.log(result.favorites[0].food)






}