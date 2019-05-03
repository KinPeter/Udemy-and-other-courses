window.onload = () => {

    for (let i = 0; i < 10; i++) {
        // key-value pair
        let keyValue = `cookie${i}=value${i}`

        // expiration
        let now = new Date()
        now.setTime(now.getTime() + 24 * 60 * 60 * 1000) //1 day
        let expires = 'expires=' + now.toUTCString()

        // cookie-string
        var cookieString = keyValue + ';' + expires

        // save the cookie
        // document.cookie = cookieString
    }

    function createCookie(key, value, days) {
        // key-value pair
        let keyValue = `${key}=${value}`

        // expiration
        let now = new Date()
        now.setTime(now.getTime() + days * 24 * 60 * 60 * 1000) 
        let expires = 'expires=' + now.toUTCString()

        // cookie-string
        var cookieString = keyValue + ';' + expires

        // save the cookie
        document.cookie = cookieString
    }

    function getCookieValue(cookieKey) {
        // creates an array of all cookies and trims off the spaces from between
        let cookieList = document.cookie.split(';').map(cookie => cookie.trim())
        console.log(cookieList)

        // split cookies to keys and values
        for (const element of cookieList) {            
            let cookie = element.split('=')
            let key = cookie[0]
            let value = cookie[1]
            // console.log(key, value)

            if (key === cookieKey) {
                return value
            }
        }        
        return undefined //if key not found
    }
    
    createCookie('test', true, 3)

    console.log(getCookieValue('test'))
    
    // only way to update a cookie value or extend expiration is to re-create it with the same name (key) so the old one will be overwritten
    createCookie('test', false, 3)
    
    console.log(getCookieValue('test'))
    
    // only way to delete a cookie is to force it to expire, so set the expiry date to past time
    createCookie('test', '', -1)
    
    console.log(getCookieValue('test'))

}