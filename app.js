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

//require geocode module
const geocode = require('./geocode/geocode')

//require weather module
const weather = require('./weather/weather')

//call geocode function to get lat/long of the address
geocode.geocodeAddress(address, (errorMessage , results) => {
    if (errorMessage){
        console.log(errorMessage)
    } else if (results){
        console.log(`Location : ${results.address} \n`)
        //get weather function and passingin the latitude and longitude from the results object in geocode
        weather.getWeather(results.latitude,results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage){
                console.log(errorMessage)
            } else {
                console.log(`Weather Summary  : ${weatherResults.summary}\n =====`)
                console.log(`High Temperature : ${weatherResults.temperature_high} \n =====`)
                console.log(`Low Temperature  : ${weatherResults.temperature_low}\n =====`)
            }
        })
    }
})