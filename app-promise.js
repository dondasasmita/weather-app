/*
This is an alternative solution to the app.js 
Using promise to handle the errors and axios library 
*/

//load yargs library
const yargs = require('yargs')
//load axios library
const axios = require('axios')
//load config
const config = require('./config')
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
//URL for the geo location api call 
const geocodeURL = `https://www.mapquestapi.com/geocoding/v1/address?key=${config.locationAPIKey}&inFormat=kvp&outFormat=json&location=${address}`

axios.get(geocodeURL).then((response) => {
        //need to fix, unable to read locations array
        if (response.data.results[0].locations.length === 0){
            throw new Error('No address found')
        }
        //get latitude from the response
        let latitude = response.data.results[0].locations[0].latLng.lat
        //get longitude from the response
        let longitude = response.data.results[0].locations[0].latLng.lng
        //weather url api call
        const weatherURL = `https://api.darksky.net/forecast/${config.weatherAPIKey}/${latitude},${longitude}`
        //print location / address
        console.log(response.data.results[0].providedLocation.location)
        //http get request to the weather api 
        return axios.get(weatherURL)
    }).then((response) => {
        //get high temperature from weather response / object
        let temperatureHigh = Math.round((response.data.daily.data[0].temperatureHigh - 32) * 0.5556 * 100) / 100
        //get low temperature from the weather response / object
        let temperatureLow = Math.round((response.data.daily.data[0].temperatureLow - 32) * 0.5556 * 100) / 100
        //get the weather summary from the response/object
        let summary = response.data.daily.summary
        //display all the results
        console.log(`Weather Summary  : ${summary}\n =====`)
        console.log(`High Temperature : ${temperatureHigh} \n =====`)
        console.log(`Low Temperature  : ${temperatureLow}\n =====`)
    }).catch((e) => { 
        //need to fix, unable to read statuscode
        if (e.data.info.statuscode === 400){
            console.log('Enter valid address')
        } else {
            console.log(e.messages)
        }
    })
