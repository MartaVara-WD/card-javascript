'use strict';

const buttonCard = document.querySelector('.js-share');
const buttonTwitter = document.querySelector('.js-twitter');
const buttonContainer = document.querySelector('.form__share__button');
const url = document.querySelector('.js-twitter-url');
const twitterButton = document.querySelector('.twitter-link');

function getJSONFromInputs(inputs) {
  return inputs.reduce(function (acc, val) {
    if (val.nodeName !== 'BUTTON') acc[val.name] = val.value;
    return acc;
  }, {});
}

function loadPhoto() {
  let myFile = document.querySelector('#img-selector').files[0];
  fr.addEventListener('load', sendData);
  fr.readAsDataURL(myFile);
}

function sendData() {
  let json = getJSONFromInputs(userData);
  json.photo = fr.result;
  sendRequest(json);
}

function createCard(event) {
  buttonCard.classList.remove('active');
  buttonCard.classList.add('inactive');
  buttonTwitter.classList.remove('hidden');
  console.log(userData);
  showURL();
}

buttonCard.addEventListener('click', function (event) {
  event.preventDefault();
  fetch('https://us-central1-awesome-cards-cf6f0.cloudfunctions.net/card/', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(function (resp) {
      return resp.json();
    })
    .then(function (result) {
      showURL(result);
    })
    .catch(function (error) {
      console.log(error);
    });
});

function showURL(result) {
  console.log(result);
  if (result.success) {
    const tweet = '✨Echa un vistazo a mi tarjeta de visita Sailor Code ✨ ';

    url.innerHTML = `${result.cardURL}<a href="${result.cardURL}" target="_blank" ></a>`;
    url.setAttribute('href', `${result.cardURL}`);

    twitterButton.setAttribute(
      'href',
      `https://twitter.com/intent/tweet?text=${tweet}&url=${result.cardURL}`
    );
    createCard();
  } else {
    url.innerHTML = 'ERROR:' + result.error;
  }
}
