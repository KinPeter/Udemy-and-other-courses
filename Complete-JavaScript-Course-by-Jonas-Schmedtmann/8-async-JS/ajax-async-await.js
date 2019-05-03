// AJAX - AWAIT

async function getWeatherAW(woeid) {
    //try-catch to catch the errors
    try {
        //data we fetch will be in JSON
        const result = await fetch('https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/' + woeid + '/');
        //convert the JSON to JS object
        const data = await result.json();
        //then play with the data:
        //console.log(data);
        const today = data.consolidated_weather[0];
        const tomorrow = data.consolidated_weather[1];
        console.log(`Temperatures in ${data.title} stay between ${today.min_temp} and ${today.max_temp}.`);
        console.log(`Temperatures tomorrow in ${data.title} stay between ${tomorrow.min_temp} and ${tomorrow.max_temp}.`);
        //return the data to be available after this function (below)
        return data;
        
    } catch (error) {
        console.log(error);
    } 
    
}

//Fetch data - run the function
//getWeatherAW(804365);

//using the fetched data after the function returned:
let dataBudapest;
getWeatherAW(804365).then(fetchedData => {
    dataBudapest = fetchedData;
    console.log(dataBudapest);
});

















