console.log('Client side javascript loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationData = document.querySelector('#locationData')

//register a form event listener
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    getForcastData(search.value)
})

function getForcastData(location) {

    fetch('/weather?address=' + location).then((response) => {

        if (response.status !== 200) {
            return console.log('Looks like there was a problem. Status Code: ' + response.status);

        }

        response.json().then(({ error, location, forecastData }) => {
            
            if (error)
                return locationData.textContent = error

            locationData.textContent = 'Weather forecast for ' + location + ' ' + forecastData
        })
    });


}