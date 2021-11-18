// getting div to dynamically add Stations from JSON file
const generateFm = document.querySelector('#fmstations');
const url = 'fms.json';

// Fetching JSON file from webUrl:
fetch(url)
    .then(response => {
    return response.json();
    }) .then (data =>  {
    // data returns JSON data, whereas data.data gives the array of data which can be manipulated
    let stations = data.data;
    generateFm.innerHTML += `<ul>`
    for (let i = 0; i < stations.length; i++) {
        let station = stations[i];
        //fetch
        generateFm.innerHTML += `<li><div class="station"> <p class='station-title'>${station.mediaTitle}</p>
                                <audio src="${station.mediaUrl}" class="audio" controls>Play</audio><br>
                                </div></li>`;
    }}).catch(error => {
    // Display error in console
    generateFm.innerHTML += `Error: ${error}`
    console.error('There was an error!');
}
)

// window.onload = loadLast();



generateFm.innerHTML += '</ul>'
// Function to play single radio stations 
document.addEventListener('play', function(e){
// Storing all audio files in an array for pausing them
var audios = document.getElementsByTagName('audio');
for(var i = 0, len = audios.length; i < len; i++){
    // All audio except the target will pause
    if(audios[i] != e.target){
        audios[i].pause();
    }
    if(audios[i] === e.target){
        localStorage.setItem('audio_index', i)
    }
}
}, true);

function loadLast(){
    var audios = document.getElementsByTagName('audio');
    audios[localStorage.getItem('audio_index')].play();
    console.log(audios[localStorage.getItem('audio_index')]);
}

const searchBar = document.querySelector('#searchInput')
console.log(searchBar);

searchBar.addEventListener('keyup', e => {
    let stationDiv
    const searchValue = document.getElementById("searchInput").value;
    console.log(searchValue);
    filter = searchValue.toLowerCase();
    console.log(filter);
    ul = document.querySelector('ul');
    li = document.getElementsByTagName('li');
    for(let i=0; i<li.length; i++){
        stationDiv = li[i].querySelector('.station');
        txtValue = stationDiv.querySelector('p').innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
          } else {
            li[i].style.display = "none";
          }
    }
})

