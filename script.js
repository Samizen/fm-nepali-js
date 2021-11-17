// getting div to dynamically add Stations from JSON file
const generateFm = document.querySelector('#fmstations');

const url = 'fms_update.json';
// JSON hosted from 
const webUrl = "http://myjson.dit.upm.es/api/bins/ccah";

// Fetching JSON file from webUrl 
fetch(webUrl)
    .then(response => {
        // response.json() returns a promise which resolves with the result of parsing the body text as JSON 
        return response.json();
    }).then(data => {
        // data returns JSON data, whereas data.data gives the array of data which can be manipulated
        let stations = data.data;
        console.log(stations)
        // Applying forEach to all the array elements.
        stations.forEach(station => {
            // Adding media title dynamically
            generateFm.innerHTML += `<p>${station.mediaTitle}`
            // Adding audio source dynamically
            generateFm.innerHTML += `<audio src="${station.mediaUrl}" controls>Play</audio>`
        });
    }).catch(error => {
        // Display error in console
        console.log(error);
    })

