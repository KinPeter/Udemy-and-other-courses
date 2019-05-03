window.onload = () => {

//-------- Storing data - 3 ways --------

    // localStorage.setItem(key, value)
    localStorage.setItem('item key', 'item Value')

    // object notation
    localStorage.keyItem = 'new item value'
    // arrow notation
    localStorage['key item 2'] = 'another item value'


//-------- Retrieving data --------

    // localStorage.getItem(key)
    console.log( localStorage.getItem('item key') ) 
    console.log( localStorage.getItem('item key asd') ) // if not existing returns null

    // object notation
    console.log( localStorage.keyItem )
    console.log( localStorage.keyItemAsd ) // if not existing returns undefined
    // arrow notation
    console.log( localStorage['key item 2'] )
    console.log( localStorage['key item 3'] ) // if not existing returns undefined


//-------- Removing data --------

    // localStorage.removeItem(key)
    localStorage.removeItem('itemKey')


//-------- Removing ALL data --------

    // localStorage.clear()


//-------- More --------

    // .length property
    console.log( localStorage.length )

    // localStorage.key(index)
    console.log( localStorage.key(0) ) // returns the key by index (number of items)

    // use the above to get an array of the stored item keys
    let keys = []
    for (let i = 0; i < localStorage.length; i++) {
        keys.push( localStorage.key(i) )
    }
    console.log(keys)


//-------- Storing OBJECTS in localStorage --------

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
    localStorage.setItem('person', personStr)

    // get the item as string
    let resultStr = localStorage.getItem('person')
    // parse it to JS object
    let result = JSON.parse( resultStr )

    console.log(result)
    console.log(result.favorites[0].food)






}