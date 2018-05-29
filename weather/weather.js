//require request module to make http calls
const request = require('request')
//require config.js
const config = require('../config')

//get weather function passing in the lat and long of the location
const getWeather = (latitude, longitude, callback) => {
    request({ 
        url: `https://api.darksky.net/forecast/${config.weatherAPIKey}/${latitude},${longitude}`,
        json: true
    },(error,response,body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                summary: body.daily.summary,
                temperature_high: Math.round((body.daily.data[0].temperatureHigh - 32) * 0.5556 * 100) / 100,
                temperature_low: Math.round((body.daily.data[0].temperatureLow - 32) * 0.5556 * 100) / 100
            })
        } else {
            callback('Unable to fetch weather')
        }
    })
}

//exporting getWeather function
module.exports = {
    getWeather
}