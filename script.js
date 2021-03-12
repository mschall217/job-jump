const keywordEl = document.querySelector('#keyword');
const placeEl = document.querySelector('#place');
const result = document.querySelector('#result');
const searchbtn = document.querySelector('.btn');
const results = document.querySelector('.results');

const keywordSaveSearch = keywordEl.value;
const placeSaveSearch = placeEl.value;


navigator.geolocation.getCurrentPosition((position) => {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log(lon);
    console.log(lat);
});


function callApi() {
    //gets input field values
    const keywordInput = keywordEl.value;
    const placeInput = placeEl.value;

    //splits input values if searching with multiple words
    const keyword = keywordInput.replace(" ", "%20");
    const place = placeInput.replace(" ", "%20");

    const jobApiUrl = 'https://data.usajobs.gov/api/Search?Keyword=' + keyword + '&ResultsPerPage=50&LocationName=' + place;
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
                    

                    for (var i = 0; i < data.SearchResult.SearchResultCount; i++) {

                        var positionTitle = data.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.PositionTitle;
                        var orgName = data.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.OrganizationName;
                        var duties = data.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.UserArea.Details.MajorDuties.slice(0,4);
                        var applyLink = data.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.PositionURI;

                        //create accordion for each search result
                        var accordion = `<br><div class='accordion accordion-flush' id='accordionFlushExample'><div class='accordion-item'><h3 class='accordion-header' id='flush-heading${[i]}'><button class='accordion-button collapsed row' type='button' data-bs-toggle='collapse' data-bs-target='#flush-collapse${[i]}' aria-expanded='false' aria-controls='flush-collapse${[i]}'> ${positionTitle} </button></h3><div id='flush-collapse${[i]}' class='accordion-collapse collapse' aria-labelledby='flush-heading${[i]}' data-bs-parent='#accordionFlushExample'><div class='accordion-body'> Organization: ${orgName}<p class="row">Job Description: ${duties}</p> <a href="${applyLink}" target="_blank">View Full Job Listing: ${applyLink}</a> <p class="row">Positive Cases: ${positiveCases} People Hospitalized: ${numHospitalized} Total Death: ${numOfDeath}</p></div></div></div></div>`;

                        results.innerHTML += accordion;

                    }

                })
            }
        })
    })
    //save current search to local storage
    localStorage.setItem("recentSearch", JSON.stringify({"keyword": keywordInput, "place": placeInput}));
}

console.log(place);
console.log(keyword);

/* function saveSearch() {
    localStorage.setItem("recentSearch", JSON.stringify({"keyword": keywordInput, "place": placeInput}));
}*/

searchbtn.addEventListener('click', callApi);
