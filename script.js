



const jobApiUrl = 'https://data.usajobs.gov/api/Search?Keyword=software&Page=3&ResultsPerPage=50&LocationName=Ohio';
const homeApiUrl = 'http://www.zillow.com/webservice/GetSearchResults.htm';

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


fetch(homeApiUrl, {
    headers: {
        'zws-id': 'X1-ZWz16rhfk3l98r_6cyom'
    }
})
    .then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            })
        }
    })