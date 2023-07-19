// btnEl is a variable used to target btn ID @ index.html. We are targetting the whole 'document'. 
//We target an HTML ID using getElementById() method and passing ID as a parameter.
const btnEl = document.getElementById("btn");
const quoteEl = document.getElementById("quote");
const imgEl = document.getElementById("image");



// we are storing our API Key in 'apiKey' variable.
const apiKey="FZOSGMBgnNrpu4xoEFsg3w==fVEkVE1OAVTaR6xc";

const url = 'https://quotes-diffusion.p.rapidapi.com/random';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'f410374e79msha41c419e8f65ec0p18aec8jsnb2fae40fcd6f',
		'X-RapidAPI-Host': 'quotes-diffusion.p.rapidapi.com'
	}
};

async function getQuote(){
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        quoteEl.innerHTML=result.data.title;
        console.log(result.data.title);
        imgEl.src = result.data.image_sd;
    } catch (error) {
        console.error(error);
    }
}



// call getJoke() function when the button is clicked using the Event listener.
// we add event listener using the addEventListener() function. 
// It is taking two parameters-
//      (i)  "click"- it is the event that triggers the action, 
//      (ii) 'getJoke' is the action that occurs after the event. 
btnEl.addEventListener("click", getQuote);