window.onload = function() {

$.ajax({
    url: 'https://reqres.in/api/users?per_page=5',
    type: 'GET',
    success: function(response) {

        console.log(response)

/*****************************************************************************/        
    // .clear()
        // clears the console at the given point - makes it easier to debug
        console.clear()

/*****************************************************************************/        
    // .log(message) advanced
        var name = "Peter"
        var float = 1.79
        var int = 33
        // printf style formatting to strings
        console.log('Hi, I am %s, %d years old, height is %f meters.', name, int, float)
        // CSS style formatting to strings
        console.log('%cThis is gonna be big and %corange', 'font-size: 24px', 'font-size: 24px; color: orange')

/*****************************************************************************/        
    // .info(message)
        // same as .log but uses INFO STYLE (with blue "i" icon)
        // * does not work in Chrome at this point :(
        console.info('This is my information message.')

/*****************************************************************************/        
    // .warn(message)
        // logs to the console in WARNING STYLE (yellow background, exclamation mark)
        console.warn('This is to warn you it\'s almost lunchtime!')

/*****************************************************************************/    
    // .error(message)
        // throws custom error message IN ERROR STYLE (red text, red X icon)
        console.error('[Error]: Something wrong happened!')

/*****************************************************************************/            
    // .dir(object)    
        console.log(document.body) // this shows the document body XML representation
        console.dir(document.body) // .dir() shows the document body AS A JAVASCRIPT OBJECT

/*****************************************************************************/        
    // .table(array)
        // logs an array as a TABLE to the console
        console.table(response.data)
        // in the table it's possible to sort by columns!

/*****************************************************************************/        
    // .group(groupname) , .groupCollapsed(groupname) , .groupEnd(groupname)
        // creates groups for other console functions - to ORGANIZE output
        // * does not work in Edge at this point :(
        var users = response.data
        for (var i = 0; i < users.length; i++) {
            logUser(users[i])
        }
        function logUser() {
            console.groupCollapsed('User ' + i)
            console.log(users[i].id)
                console.group('Name')
                    console.log(users[i].first_name)
                    console.log(users[i].last_name)
                console.groupEnd('Name')
                console.log(users[i].avatar)
            console.groupEnd('User ' + i)
        }

/*****************************************************************************/        
    // .count(label)
        // shows on console how many times the count() method was called, with a custom text label we pass in
        // useful to add it to exceptions
        var label1 = "FOO Function is called"
        function foo() {
            console.count(label1)
        }
        foo()
        foo()
        foo()

/*****************************************************************************/        
    // .time(label) , .timeEnd(label)
        // .time() starts a timer when it's invoked, the .timeEnd() stops it and logs the elapsed time to the console
        console.time('Time of for loop')
        for (let i = 0; i < 1000000000; i++) {
            var b = i * 5    
        }
        console.timeEnd('Time of for loop')

        console.time('Time for ajax call')
        $.ajax({
            url: 'https://reqres.in/api/users?per_page=5',
            type: 'GET',
            success: function(response) {
                console.timeEnd('Time for ajax call')
            }
        }) 

/*****************************************************************************/        
    // .asert(assertion, errorMessage)
        // checks the passed condition on the response, if true, nothing happens, if false, throws the passed error message
        console.assert(response.per_page === 4, '[Error]: Item per page number is not 4.')

/*****************************************************************************/            
    // .trace(label)
        // traces all functions and methods that was called up to the .trace() call and logs them to the console
        function first() {
            second()
        }
        function second() {
            third()
        }
        function third() {
            console.trace('Test trace stack')
        }
        first()

/*****************************************************************************/        
    }
})
}