//FIXER.IO currency API URL:
//http://data.fixer.io/api/latest?access_key=1de10b057c8fd5ffd4fe8141b9d0fe6b

//RESTCOUNTRIES.EU country data API --> currency usage URL
//https://restcountries.eu/rest/v2/currency/usd

const axios = require('axios');

// old Promise version:
// const getExchangeRate = (from, to) => {
//     return axios.get('http://data.fixer.io/api/latest?access_key=1de10b057c8fd5ffd4fe8141b9d0fe6b').then((response) => {
//         const euro = 1 / response.data.rates[from];
//         const rate = euro * response.data.rates[to];
//         return rate;
//     });
// };

// ASYNC/AWAIT version:
const getExchangeRate = async (from, to) => {
    try {
        const response = await axios.get('http://data.fixer.io/api/latest?access_key=1de10b057c8fd5ffd4fe8141b9d0fe6b');
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];
        if (isNaN(rate)) {
            throw new Error();
        }
        return rate;
    } catch (err) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to}.`);
    }
};

const getCountries = async (currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch (err) {
        throw new Error(`Unable to get countries that use ${currencyCode} as a currency.`);
    }
};

const convertCurrency = async (from, to, amount) => {
    try {
        const rate = await getExchangeRate(from, to);
        const countries = await getCountries(to);
        const convertedAmount = (amount * rate).toFixed(2);
        return `${amount} ${from} is worth ${convertedAmount} ${to}. \nYou can use it in these countries: ${countries.join(', ')}.`;
    } catch (err) {
        return err.message;
    }
}

convertCurrency('HUF', 'CZK', 10000).then((result) => console.log(result));



