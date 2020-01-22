
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='https://api.darksky.net/forecast/82490d7100356661683f4146eed77e29/'+latitude+','+longitude+'?units=si'
    
        request({ url: url, json: true} , (error, response) => {
            if(error){
                callback('Unable to connect', undefined)
            } else if (response.body.error) {
                callback('Unable to find location',undefined)
            }else {
                //console.log(response.body.daily.data[0].summary+' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' +response.body.currently.precipProbability+' chance of rain.')
                callback(undefined, 
                // {summary: response.body.daily.data[0].summary,
                // temperature: response.body.currently.temperature ,
                // percipitation: response.body.currently.precipProbability,}
                response.body.daily.data[0].summary+' It is currently ' + response.body.currently.temperature + ' degrees out. There is a ' +response.body.currently.precipProbability+' chance of rain. The Max temperature is ' +response.body.daily.data[0].temperatureHigh+' and the min temperarure is ' +response.body.daily.data[0].temperatureLow + '. The wind speeed is '+response.body.daily.data[0].windSpeed +' and the wind ust is '+response.body.daily.data[0].windGust 
            )
        }
            
    })

}

module.exports = forecast