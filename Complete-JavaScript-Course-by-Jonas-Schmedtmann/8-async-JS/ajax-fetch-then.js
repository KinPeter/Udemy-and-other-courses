// AJAX

function getWeather(woeid) {
    fetch('https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/' + woeid + '/')
    .then(function(result) {
        console.log(result);
        return result.json();
    })
    .then(function(data) {
        //console.log(data);
        const today = data.consolidated_weather[0];
        console.log(`Temperatures in ${data.title} stay between ${today.min_temp} and ${today.max_temp}.`)
    })
    .catch(function(error) {
        console.log(error);
    });
}

getWeather(804365);























