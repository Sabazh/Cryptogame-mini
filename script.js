const API_URL = `https://api.api-ninjas.com/v1/cryptoprice?symbol=BTCUSD`;
const API_KEY = 'mKk6BqqYyyuPqJuO9K5TfEP1jV92pw0V9Gk3NmOM';

const PRICE_ELEMENT = document.getElementById('price');
const result = document.getElementById('result');
const chosenPrice = document.getElementById('savedPrice');
let savedPrice;
let previousPrice;

async function getBitcoinPrice() {
    const response = await fetch(API_URL, {
        headers: {
            'X-Api-Key': API_KEY
        }
    });
    if (response) {
        const data = await response.json();
        let price = Number(data.price);
        previousPrice = price;
        PRICE_ELEMENT.innerHTML = price.toFixed(2);
    } else {
        console.log(`Something weird happened`);
    }
}

getBitcoinPrice();

setInterval(() => {
        getBitcoinPrice();
    }, 1000)

function onHigher() {
    savedPrice = previousPrice;
    chosenPrice.innerHTML = previousPrice;
    setTimeout(() => {
        if(previousPrice > savedPrice) {
            result.innerHTML = 'CONGRATS YOU WERE RIGHT  ' + previousPrice;
        } else {
            result.innerHTML = 'SORRY YOU WERE WRONG  ' + previousPrice;
        }
    }, 5000)
}

function onLower() {
    savedPrice = previousPrice;
    chosenPrice.innerHTML = previousPrice;
    setTimeout(() => {
        if(previousPrice < savedPrice) {
            result.innerHTML = 'CONGRATS YOU WERE RIGHT' + previousPrice;
        }else {
            result.innerHTML = 'SORRY YOU WERE WRONG' + previousPrice;
        }
    }, 5000)
}