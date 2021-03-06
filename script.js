const keywordEl = document.querySelector('#keyword');
const placeEl = document.querySelector('#place');
const result = document.querySelector('#result');
const searchbtn = document.querySelector('.btn');

const keyword = keywordEl.value;
const place = placeEl.value;

console.log(keyword);





function callApi() {
    //gets input field values
    const keyword = keywordEl.value;
    const place = placeEl.value;

    const jobApiUrl = 'https://data.usajobs.gov/api/Search?Keyword=' + keyword + '&ResultsPerPage=50&LocationName=' + place;
    const covidApiUrl = "https://api.covidtracking.com/v1/states/" + place + "/current.json"

    console.log(keyword);
    console.log(place);
    console.log(jobApiUrl);
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

        fetch(covidApiUrl)
        .then(function (response) {
            console.log(response);
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                })
            }
        })
}

searchbtn.addEventListener('click', callApi);