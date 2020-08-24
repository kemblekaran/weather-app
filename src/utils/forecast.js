const postmanRequest = require('postman-request')

const forecast = function({lat,long},callback){

    const weatherstackApiAccessKey = '2a280e73f10cce83ccfcce9203d02dca'
    const forecaseUrl = 'http://api.weatherstack.com/current?access_key='+weatherstackApiAccessKey+'&query='+lat+','+long
    
    postmanRequest({
        url: forecaseUrl, json: true
    }, (error, response)=>{
        if(error){
            console.log('Unable to connect to the system')
            callback(error,undefined)
        }else if(response.body.success){
            console.log('Unable to find weather for the provided location. Please try another search')
            callback(error,response.body.error)
        }else{
            callback(undefined, {
                location: response.body.location.name,
                temperature: response.body.current.temperature,
                precipitation: response.body.current.precip
            })
        }
    })
}

module.exports = forecast