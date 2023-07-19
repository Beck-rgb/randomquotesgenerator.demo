const btnEl = document.getElementById("btn");
const quoteEl = document.getElementById("quote");
const imgEl = document.getElementById("image");


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

async function getQuoteImage(){
  try {
      const response = await fetch(url, options);
      const result = await response.json();
      imgEl.src = result.data.image_sd;
      console.log(result.data.image_sd);
  } catch (error) {
      console.error(error);
  }
}

async function getQuoteText(){
  try {
      const response = await fetch(url, options);
      const result = await response.json();
      quoteEl.innerHTML=result.data.title;
      console.log(result.data.title);
  } catch (error) {
      console.error(error);
  }
}

btnEl.addEventListener("click", getQuoteText);