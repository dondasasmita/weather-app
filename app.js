const request = require('request')
const config = require('./config.js')

request({
    url: `https://www.mapquestapi.com/geocoding/v1/address?key=${config.apiKey}&inFormat=kvp&outFormat=json&location=Singapore%20560422`,
    json: true
},(error,response,body) => {
    console.log(`Address : ${body.results[0].providedLocation.location}`)
    console.log(`Latitude : ${body.results[0].locations[0].latLng.lat}`)
    console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`)
})