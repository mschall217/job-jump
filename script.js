const keyword = document.querySelector('#keyword');
const place = document.querySelector('#place');
const result = document.querySelector('#result');



const jobApiUrl = 'https://data.usajobs.gov/api/Search?Keyword=software&Page=3&ResultsPerPage=50&LocationName=Ohio';
const homeApiUrl = 'https://api.covidtracking.com/v1/us/current.json';

fetch(jobApiUrl, {
    headers: {
        'Authorization-key': 'RN/eTW8teoxznCRynHSZxey6do4S52rVL47RUyd+Y1E='
    }
})
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            })
        }
    })


fetch(homeApiUrl)
    .then(function (response) {
        console.log(response);
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            })
        }
    })

