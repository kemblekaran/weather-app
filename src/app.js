const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Karan Kemble'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Karan Kemble'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Karan Kemble'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Karan Kemble',
        message: 'Help article not found'
    })
})

app.get('/weather', (req, res) => {


    if (!req.query.address || req.query.address.length == 0) {
        return res.send({
            error: 'address is mandatory'
        })
    }

    geocode(req.query.address, (error, { apiError, latitude: lat, longitude: long, name }) => {

        //look for errors while connecting to the api
        if (error) {
            return res.send({ error })
        }

        //look for api error while making request
        if (apiError) {
            return res.send({
                error: apiError
            })
        }

        //fetch location
        console.log('Searching weather forecast for ' + name)
        forecast({ lat, long }, (error, { error: apiError, temperature: temp, precipitation: precip, location }) => {

            if (error) {
                return res.send({ error })
            }

            if (apiError) {
                return res.send({ error: 'Unable to find weather for the provided location. Please try another search' })
            }

            res.send({
                location,
                forecastData: 'The temperature is ' + temp + ' and there is ' + precip + ' chance of rain'
            })

        })

    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Karan Kemble',
        message: 'Page Not Found'
    })
})
app.listen(port, () => {
    console.log('application started on port ' + port)
})