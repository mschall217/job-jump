const keywordEl = document.querySelector('#keyword');
const placeEl = document.querySelector('#place');
const result = document.querySelector('#result');
const searchbtn = document.querySelector('.btn');
const results = document.querySelector('.results');

const keyword = keywordEl.value;
const place = placeEl.value;

console.log(keyword);





function callApi() {
    //gets input field values
    const keywordInput = keywordEl.value;
    const placeInput = placeEl.value;

    //splits input values if searching with multiple words
    const keyword = keywordInput.replace(" ", "%20");
    const place = placeInput.replace(" ", "%20");

    const jobApiUrl = 'https://data.usajobs.gov/api/Search?Keyword=' + keyword + '&ResultsPerPage=20&LocationName=' + place;
    const covidApiUrl = "https://api.covidtracking.com/v1/states/" + place + "/current.json"

    console.log(keyword);
    console.log(place);
    console.log(jobApiUrl);
    fetch(covidApiUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function(covidData){
    fetch(jobApiUrl, {
        headers: {
            'Authorization-key': 'RN/eTW8teoxznCRynHSZxey6do4S52rVL47RUyd+Y1E='
        }
    })
    
        .then(function (response) {
            const {positive:positiveCases} = covidData;
            const {death:numOfDeath} = covidData;
            const {hospitalized:numHospitalized} = covidData;
    
            console.log(covidData);
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    //clears previous search result
                    results.innerHTML = '';
                    var covidContainer = `<div class="row covid-style"><h4>COVID DATA FOR ${place}:<span style="margin: 0 10px;></span></h4> <h4 class="covid">Positive Cases: ${positiveCases} <span style="margin: 0 10px;></span></h4><h4 class="covid">People Hospitalized: ${numHospitalized} <span style="margin: 0 10px;></span></h4><h4 class="covid"> Total Death: ${numOfDeath} <span style="margin: 0 10px;></span></h4></div>`
                    results.innerHTML += covidContainer;
                    
                    
                    for (var i = 0; i < data.SearchResult.SearchResultCount; i++) {

                        var positionTitle = data.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.PositionTitle;
                        var orgName = data.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.OrganizationName;
                        var duties = data.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.UserArea.Details.MajorDuties.slice(0,4);
                        var applyLink = data.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.PositionURI;

                        
                        //create accordion for each search result
                        var accordion = `<div class='accordion accordion-flush' id='accordionFlushExample'><div class='accordion-item'><h3 class='accordion-header' id='flush-heading${[i]}'><button class='accordion-button collapsed row' type='button' data-bs-toggle='collapse' data-bs-target='#flush-collapse${[i]}' aria-expanded='false' aria-controls='flush-collapse${[i]}'> ${positionTitle} </button></h3><div id='flush-collapse${[i]}' class='accordion-collapse collapse' aria-labelledby='flush-heading${[i]}' data-bs-parent='#accordionFlushExample'><div class='accordion-body'> Organization: ${orgName}<p class="row">Job Description: ${duties}</p> <a href="${applyLink}" target="_blank">Click here to view full job listing</a></div></div></div></div>`;

                        results.innerHTML += accordion;

                    }

                })
            }
        })
    })
}

searchbtn.addEventListener('click', callApi);