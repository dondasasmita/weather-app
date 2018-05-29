//require request module to make http calls
const request = require('request')
//require config.js
const config = require('../config')

//function to get lat/long from mapquest api
const geocodeAddress = (address, callback) => {
    request({ 
        url: `https://www.mapquestapi.com/geocoding/v1/address?key=${config.locationAPIKey}&inFormat=kvp&outFormat=json&location=${address}`,
        json: true
    },(error,response,body) => {
        if (error){
            callback('Unable to connect to server.')
        } else if (body.info.messages.length !== 0) {
            callback('Unable to find location, try again.')
        } else if (body.info.messages.length === 0){
            callback(undefined, {
                address: body.results[0].providedLocation.location,
                latitude:body.results[0].locations[0].latLng.lat, 
                longitude:body.results[0].locations[0].latLng.lng
            })
        }
    })
}

//exporting geocodeAddress function
module.exports = {
    geocodeAddress
}
