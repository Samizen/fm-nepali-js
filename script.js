// getting div to dynamically add Stations from JSON file
const generateFm = document.querySelector('#fmstations');

const url = 'fms.json';

function errorMessage(){
    console.log("There was an error loading this FM")
    generateFm.innerHTML += "Error Occured loading this FM"
}


// Fetching JSON file from webUrl:
fetch(url)
    .then(response => {
    // console.log(response);
    return response.json();
    }) .then (data =>  {
    // data returns JSON data, whereas data.data gives the array of data which can be manipulated
    let stations = data.data;
    // console.log(stations);
    for (let i = 0; i < stations.length; i++) {
        let station = stations[i];
        //fetch
        generateFm.innerHTML += `<p>${station.mediaTitle}`
        generateFm.innerHTML += `<audio src="${station.mediaUrl}" class="audio" onerror="errorMessage()" controls>Play</audio><br>`;
        // Adding audio source dynamically
        //media url http req
        let audio = document.querySelector(".audio")
        audio.onerror = function() {
            console.log(`Error occured!`)
            generateFm.innerHTML += `Error Occured!`
        }; 
    }}).catch(error => {
    // Display error in console
    generateFm.innerHTML += `Error: ${error}`
    console.error('There was an error!');
    let audio = document.querySelectorAll(".audio");
        console.log(audio)
})


// Function to play single radio stations 
document.addEventListener('play', function(e){
// Storing all audio files in an array for pausing them
var audios = document.getElementsByTagName('audio');
for(var i = 0, len = audios.length; i < len;i++){
    // All audio except the target will pause
    if(audios[i] != e.target){
        audios[i].pause();
    }
}
}, true);


$('audio').addEventListener('error', function failed(e) {
   // audio playback failed - show a message saying why
   // to get the source of the audio element use $(this).src
   switch (e.target.error.code) {
     case e.target.error.MEDIA_ERR_ABORTED:
       alert('You aborted the video playback.');
       break;
     case e.target.error.MEDIA_ERR_NETWORK:
       alert('A network error caused the audio download to fail.');
       break;
     case e.target.error.MEDIA_ERR_DECODE:
       alert('The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.');
       break;
     case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
       alert('The video audio not be loaded, either because the server or network failed or because the format is not supported.');
       break;
     default:
       alert('An unknown error occurred.');
       break;
   }
 }, true);