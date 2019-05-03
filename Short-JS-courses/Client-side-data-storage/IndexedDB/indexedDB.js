window.onload = () => {

// Creating a database
    const dbName = 'testdb'
    const dbVersion = 5 //only int!

    // create new or handle existing DB with .open()
    const dbRequest = indexedDB.open(dbName, dbVersion)
    console.log(dbRequest)

    // events regarding indexedDB.open()
    dbRequest.onupgradeneeded = (event) => {
        // fires first time when the dbVersion is changed
        // need to use this function to make structural changes!
        console.log('upgrade needed!') 
    }
    dbRequest.onerror = (event) => {
        console.error('error: ' + event.target.error)
    }
    dbRequest.onsuccess = (event) => {
        console.log('Created Successfully' + event.target.result) //when db created successfully
    }
    dbRequest.onblocked = (event) => {
        console.log('Blocked!')
    }
    
// Object Stores (tables)
    dbRequest.onupgradeneeded = (event) => {
        // need to use .onupgradeneeded() function to make structural changes!
        // each time we make a change we need to increase the dbVersion number!!!

        // set the db as a variable
        const db = event.target.result

        // dbVersion++ before run this code!

        // create the first store: .createObjectStore(storeName, options)
        db.createObjectStore('firstStore')

        // by using options, we can set the primary keys:
        // keyPath will take the 'email' propery of the value object as a key
        db.createObjectStore('users', {keyPath: 'email'})

        // autoIncrements automatically set incrementing numbers as keys
        db.createObjectStore('books', {autoIncrement: true})

    }

// Handling a database
    dbRequest.onsuccess = (event) => {
        // set the db as a variable
        const db = event.target.result //or dbRequest.result

        // creating transaction on object stores
        // db.transaction(storeName(s), transactionMode)
        // storeNames -> 'storeName' or ['storeName1', 'storeName2']
        // transactionMode -> 'readonly' or 'readwrite' or 'versionchange' (if no mode added default is readonly)
        let trans = db.transaction(['books', 'users'], 'readwrite') 
        // handle a store
        let store = trans.objectStore('books')
        let store2 = trans.objectStore('users')

        console.log(store2)

        // adding an item
        store.add({id: 5, name: 'test'})

        // let addRequest = store2.add({email: 'p@kk.com', name: 'peter' }) //email will automatically be the key as set above

        // all functions are async so we need to track them afterwards:
        // addRequest.onsuccess = () => {
        //     alert('user is added')
        // }
        // addRequest.onerror = (event) => {
        //     console.error(event)
        // }

        // calculating item count in store
        let countRequest = store2.count()
        countRequest.onsuccess = (event) => {
            console.log('count items : ' + event.target.result)
        }

        // fetching object from store
        let getRequest = store2.get('p@k.com') //using the key
        getRequest.onsuccess = (event) => {
            console.log(event.target.result)
        }

        // fetching all data from store
        let getAllRequest = store2.getAll()
        getAllRequest.onsuccess = (event) => {
            console.log(event.target.result)
        }

        // updating data
        let updateRequest = store2.put({email: 'ppp@kkkk.com', name: 'Peter Kin'})
        updateRequest.onsuccess = (event) => {
            console.log(event.target)
        }

        // deleting data
        let deleteRequest = store2.delete('pp@kkkk.com')
        deleteRequest.onsuccess = (event) => {
            console.log(event.target)
        }

        // deleting all data from a store
        let deleteAllRequest = store.clear()
        deleteAllRequest.onsuccess = (event) => {
            console.log(store)
        }

    }

    // delete an object store
    dbRequest.onupgradeneeded = (event) => {
        // need to use .onupgradeneeded() function to make structural changes!
        // each time we make a change we need to increase the dbVersion number!!!

        // set the db as a variable
        const db = event.target.result

        // dbVersion++ before run this code!

        // delete an object store
        db.deleteObjectStore('firstStore')
    }

// Removing a database
    const dbDeleteRequest = indexedDB.deleteDatabase('testdb')
    dbDeleteRequest.onsuccess = (event) => {
        console.log('Database deleted')
    }
    dbDeleteRequest.onerror = (event) => {
        console.error(event)
    }
}