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
                    //clears previous search result
                    results.innerHTML = '';
                    
                    for (var i=0; i < data.SearchResult.SearchResultCount; i++) {

                        // create div to hold each job posting
                        var resultContainer = document.createElement('div');
                        results.appendChild(resultContainer);

                        // create job title header within job posting
                        var jobTitleCont = document.createElement('h2');
                        resultContainer.appendChild(jobTitleCont);
                        //set text content of job title
                        var positionTitle = data.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.PositionTitle;
                        jobTitleCont.textContent = positionTitle;
                
                        // create organization tag
                        var orgNameTag = document.createElement('h4');
                        resultContainer.appendChild(orgNameTag);
                        //set text content of job organization
                        var orgName = data.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.OrganizationName;
                        orgNameTag.textContent = orgName;

                        // create job desc p tag
                        var orgNameTag = document.createElement('h4');
                        resultContainer.appendChild(orgNameTag);
                        //set text content of job description
                        var orgName = data.SearchResult.SearchResultItems[i].MatchedObjectDescriptor.OrganizationName;
                        orgNameTag.textContent = orgName;




                        
                    }
                    
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