//require request module to make http calls
const request = require('request')
//require config.js
const config = require('./config.js')
//load yargs module
const yargs = require('yargs')
//setup the arguments (address) to be passed in the command line
const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'get weather on the address',
            string: true
        }
    })
    .help()
    .argv
//encode user input (ignoring spaces and replacing them with %20)
const address = encodeURIComponent(argv.a)

request({
    url: `https://www.mapquestapi.com/geocoding/v1/address?key=${config.apiKey}&inFormat=kvp&outFormat=json&location=${address}`,
    json: true
},(error,response,body) => {
    if (error){
        console.log('Unable to connect to server.')
    } else if (body.info.messages.length !== 0) {
        console.log('Unable to find location, try again.')
    } else if (body.info.messages.length === 0){
        console.log(`Address : ${body.results[0].providedLocation.location}`)
        console.log(`Latitude : ${body.results[0].locations[0].latLng.lat}`)
        console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`)
    }
})