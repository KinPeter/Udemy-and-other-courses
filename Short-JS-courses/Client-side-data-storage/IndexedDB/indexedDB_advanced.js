window.onload = () => {

// Creating a database
    const dbName = 'library'
    const dbVersion = 3 //only int!

    // create new or handle existing DB with .open()
    const dbRequest = indexedDB.open(dbName, dbVersion)
    console.log(dbRequest)

    dbRequest.onupgradeneeded = function(event) {
        const db = event.target.result
        const store = db.createObjectStore('books', { keyPath: 'isbn' })

        // creating index passing the indexName, keyPath and options
        store.createIndex('by_author', 'author', { unique: false })

        // deleting an index
        const store = dbRequest.transaction.objectStore('books')
        store.deleteIndex('by_author')
    }

    dbRequest.onsuccess = function() {
        console.log('DB is successfully opened!')

        // Handling Database
        const db = dbRequest.result

        // Creating Transaction
        const transaction = db.transaction('books', 'readwrite')

        // Handling Object Store
        const store = transaction.objectStore('books')

        // Handling index wrapper
        const index = store.index('by_author')
        console.log(index)

        // looking for specific author
        const author = 'Eric A. Meyer'
        const getEricRequest = index.getAll(author)
        getEricRequest.onsuccess = (event) => {
            // console.log(event.target.result)
        }
        // getting the number of results
        index.count(author).onsuccess = (event) => {
            console.log(event.target.result)
        }
        // getting all the keys of the result objects
        index.getAllKeys(author).onsuccess = (event) => {
            // console.log(event.target.result)
        }




        // for (let i = 0; i < 10000; i++) {
        //     store.add({isbn: '1449358381'+i, name: 'CSS and Documents'+i, author: 'Eric A. Meyer'})
        // }
        /*
        store.add({isbn: '1118206916', name: 'HTML and CSS: Design and Build Websites', author: 'Jon Duckett'})
        store.add({isbn: '1449358381', name: 'CSS and Documents', author: 'Eric A. Meyer'})
        store.add({isbn: '1491918012', name: 'CSS: The Missing Manual', author: 'David Sawyer McFarland'})
        store.add({isbn: '1430219327', name: 'AdvancED CSS', author: 'Joe Lewis'})
        store.add({isbn: '0764597906', name: 'Accessible XHTML and CSS Web Sites: Problem - Design - Solution', author: 'Jon Duckett'})
        store.add({isbn: '1449397255', name: 'CSS: The Definitive Guide: The Definitive Guide', author: 'Eric A. Meyer'})
        store.add({isbn: '0735714258', name: 'More Eric Meyer on CSS', author: 'Eric A. Meyer'})
        */
    }

    dbRequest.onerror = function() {
        console.log('DB is NOT opened!')
    }

}
