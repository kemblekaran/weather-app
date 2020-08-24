const postmanRequest = require('postman-request')

const geocode = function (address, callback) {
    const accessToken = 'pk.eyJ1Ijoia2VtYmxla2FyYW4iLCJhIjoiY2tlMHlmZWowMDY4bTJxcDRtbjd0YWlnayJ9.M-Tlxuia6qFvdhZBzT2zUA'
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=' + accessToken

    postmanRequest({
        url: geoCodeUrl, json: true
    }, (error, response) => {

        if (error) {
            callback({ error: 'Unable to connect to the system' }, undefined)
        }

        if (!response.body.features || response.body.features.length === 0) {
            callback(undefined, { apiError: 'Unable to find the location. Please try to search location.' })
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                name: response.body.features[0].place_name
            })
        }


    })
}

module.exports = geocode