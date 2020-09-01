"use strict";

let number = 1;

//variables con las opciones de los colores//

const styleBlue = document.querySelector(".style-blue");
const styleRed = document.querySelector(".style-red");
const styleYellow = document.querySelector(".style-yellow");

//variables del cambio de estilos//
const colorLeftSquare = document.querySelector(".js-square");
const colorName = document.querySelector(".js-name-print");
const colorBackground = document.querySelector(".js-background");

//estos seleccionan los grupos de iconos y de bordes de iconos
const colorIcons = document.querySelectorAll(".js-icon");
const colorBorder = document.querySelectorAll(".js-border");

//paletas de colores
const palette1 = [
  "style-blue-dark",
  "style-blue-medium",
  "style-blue-light",
  "style-blue-background",
  "style-blue-background-icon",
];
const palette2 = [
  "style-red-dark",
  "style-red-medium",
  "style-red-light",
  "style-red-background",
  "style-red-background-icon",
];
const palette3 = [
  "style-yellow-dark",
  "style-yellow-medium",
  "style-yellow-light",
  "style-yellow-background",
  "style-yellow-background-icon",
];

function checkStyle(style) {
  if (style === "style-blue") {
    userData.palette = 1;
  } else if (style === "style-red") {
    userData.palette = 2;
  } else {
    userData.palette = 3;
  }
}

function handlerStyle(event) {
  iconChangeBlue();
  iconChangeRed();
  iconChangeYellow();
  if (event !== undefined) {
    const style = event.currentTarget.classList.value;
    checkStyle(style);
  }

  //Muestra cuál es el evento actual//
  if (userData.palette === 1) {
    input.palette = 1;
    changeColors(palette1);
    removeColors(palette2);
    removeColors(palette3);
  } else if (userData.palette === 2) {
    input.palette = 2;
    changeColors(palette2);
    removeColors(palette1);
    removeColors(palette3);
  } else if (userData.palette === 3) {
    input.palette = 3;
    changeColors(palette3);
    removeColors(palette1);
    removeColors(palette2);
  }
  saveFormValues("palette");
}

function changeColors(palette) {
  colorName.classList.add(palette[0]);
  colorLeftSquare.classList.add(palette[1]);
  colorBackground.classList.add(palette[3]);

  for (const icon of colorIcons) {
    icon.classList.add(palette[0]);
  }
  for (const border of colorBorder) {
    border.classList.add(palette[2]);
  }
}

function removeColors(palette) {
  colorName.classList.remove(palette[0]);
  colorLeftSquare.classList.remove(palette[1]);
  colorBackground.classList.remove(palette[3]);
  for (const icon of colorIcons) {
    icon.classList.remove(palette[0]);
  }
  for (const border of colorBorder) {
    border.classList.remove(palette[2]);
  }
}

styleBlue.addEventListener("click", handlerStyle);
styleRed.addEventListener("click", handlerStyle);
styleYellow.addEventListener("click", handlerStyle);
const allInput = document.querySelectorAll(".js-input");
const input = {
  name: document.querySelector(".js-name"),
  phone: document.querySelector(".js-phone"),
  job: document.querySelector(".js-job"),
  email: document.querySelector(".js-email"),
  linkedin: document.querySelector(".js-linkedin"),
  github: document.querySelector(".js-github"),
  palette: 1,
};

let print = {
  phone: document.querySelector(".js-phone-icon"),
  name: document.querySelector(".card__top__title__name"),
  job: document.querySelector(".card__top__title__role"),
  email: document.querySelector(".js-email-icon"),
  linkedin: document.querySelector(".js-linkedin-print"),
  github: document.querySelector(".js-github-print"),
};
//create empty object to save user info
let userData = {};
let recoverData = "";

//función que guarda los datos
function saveFormValues(data) {
  if (data !== "palette") {
    userData[data] = input[data].value;
  } else {
    userData[data] = input[data];
  }
  localStorage.setItem("userData", JSON.stringify(userData));
  return userData[data];
}

//envía los datos a la tarjeta
function sendUserData(data) {
  if ((data === "name" || data === "job") && userData[data].length !== 0) {
    print[data].innerHTML = userData[data];
  } else if (data === "name" && userData[data].length === 0) {
    print[data].innerHTML = "Nombre Apellido";
  } else if (data === "job" && userData[data].length === 0) {
    print[data].innerHTML = "Front-end developer";
  } else if (data === "phone") {
    print[data].hef = `tel:` + userData[data];
  } else if (data === "email") {
    print[data].setAttribute("href", `mailto:${userData[data]}`);
  } else if (data === "linkedin") {
    print[data].setAttribute(
      "href",
      `https://www.linkedin.com/in/${userData[data]}`
    );
  } else if (data === "github") {
    print[data].setAttribute("href", `https://github.com/${userData[data]}`);
  } else if (data === "photo" && userData[data] !== "") {
    let image = userData[data];
    writeLocalImage(image);
  } else {
    handlerStyle();
  }
}

// esta hace magia y lo cambia en la tarjeta
function printUserData(ev) {
  const id = ev.currentTarget.id;
  saveFormValues(id);
  sendUserData(id, userData);
  buttonActive();
}
function storageData() {
  recoverData = JSON.parse(localStorage.getItem("userData"));
  if (recoverData !== 0) {
    for (let item of Object.keys(recoverData)) {
      if (item !== "photo" && item !== "palette") {
        input[item].value = recoverData[item];
        userData[item] = recoverData[item];
      } else if (item === "photo") {
        userData[item] = recoverData[item];
      } else {
        userData[item] = recoverData[item];
        tickPalette();
      }
      sendUserData(item);
    }
  }
  buttonActive();
}

function tickPalette() {
  if (userData["palette"] === 3) {
    document.querySelector(".js-input-yellow").checked = true;
  } else if (userData["palette"] === 2) {
    document.querySelector(".js-input-red").checked = true;
  } else {
    document.querySelector(".js-input-blue").checked = true;
  }
}

document.addEventListener("DOMContentLoaded", storageData);

const resetButton = document.querySelector(".js-reset-button");
const form = document.querySelector(".js-form");

//limpia el formulario(no la tarjeta)
function resetForm() {
  form.reset();
  for (let item of Object.keys(userData)) {
    userData[item] = "";
  }
  localStorage.setItem("userData", JSON.stringify(userData));

  //Recarga la página y se queda con los valores iniciales
  //location.reload();
  changeColors(palette1);
  removeColors(palette2);
  removeColors(palette3);
  //vuelven a escribir la info por defecto de nombre y puesto
  print.name.innerHTML = "Nombre Apellido";
  print.job.innerHTML = "Front-end developer";

  localStorage.setItem("userData", JSON.stringify(userData));
  //vuelve a la imagen por defecto
  document.querySelector(".js__profile-image").removeAttribute("style");
  document.querySelector(".js__profile-preview").removeAttribute("style");
  //cierra el botón share y oculta twitter
  buttonCard.classList.remove("inactive");
  buttonTwitter.classList.add("hidden");

  //funciones que borran los styles de los fondos
  iconChangeBlue();
  iconChangeRed();
  iconChangeYellow();
}

resetButton.addEventListener("click", resetForm);

createEvent();
function createEvent() {
  for (let item of allInput) {
    item.addEventListener("keyup", printUserData);
  }
}

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

'use strict';

const click = document.querySelector('.click');
const section = document.querySelector('.colors-container');
const arrowDown = document.querySelector('.moonicondown');
const arrowUp = document.querySelector('.mooniconup');

function displayArrow(ev) {
  ev.preventDefault();
  section.classList.toggle('hidden');
  arrowUp.classList.toggle('hidden');
  arrowDown.classList.toggle('hidden');
}

click.addEventListener ('click', displayArrow);

const click2 = document.querySelector('.click2');
const section2 = document.querySelector('.form__section__signup');
const arrowDown2 = document.querySelector('.moonicondown2');
const arrowUp2 = document.querySelector('.mooniconup2');

function displayArrow2(ev) {
  ev.preventDefault();
  section2.classList.toggle('hidden');
  arrowUp2.classList.toggle('hidden');
  arrowDown2.classList.toggle('hidden');
}

click2.addEventListener ('click', displayArrow2);

// share
const click3 = document.querySelector('.click3');
const section3 = document.querySelector('.form__share__button');
const arrowDown3 = document.querySelector('.moonicondown3');
const arrowUp3 = document.querySelector('.mooniconup3');

function displayArrow3(ev) {
  ev.preventDefault();
  section3.classList.toggle('hidden');
  arrowUp3.classList.toggle('hidden');
  arrowDown3.classList.toggle('hidden');
}

click3.addEventListener('click', displayArrow3);
'use strict';

const fr = new FileReader();
const uploadBtn = document.querySelector('.js__profile-trigger');
const fileField = document.querySelector('.js__profile-upload-btn');
const profileImage = document.querySelector('.js__profile-image');
const profilePreview = document.querySelector('.js__profile-preview');
/**
 * Recoge el archivo añadido al campo de tipo "file"
 * y lo carga en nuestro objeto FileReader para que
 * lo convierta a algo con lo que podamos trabajar.
 * Añade un listener al FR para que ejecute una función
 * al tener los datos listos
 param {evento} e **/

function getImage(e) {
  const myFile = e.currentTarget.files[0];
  fr.addEventListener('load', writeImage);
  fr.readAsDataURL(myFile);
}

/**
 * Una vez tenemos los datos listos en el FR podemos
 * trabajar con ellos ;)
 */
function writeImage() {
  /* En la propiedad `result` de nuestro FR se almacena
   * el resultado. Ese resultado de procesar el fichero que hemos cargado
   * podemos pasarlo como background a la imagen de perfil y a la vista previa
   * de nuestro componente.
   */
  profileImage.style.backgroundImage = `url(${fr.result})`;
  profilePreview.style.backgroundImage = `url(${fr.result})`;
  userData.photo = fr.result;
  localStorage.setItem('userData', JSON.stringify(userData));
}

/**
 * Genera un click automático en nuesto campo de tipo "file"
 * que está oculto
 */
function fakeFileClick(event) {
  event.preventDefault();
  fileField.click();
}

function writeLocalImage(image){
  profileImage.style.backgroundImage = `url(${image})`;
  profilePreview.style.backgroundImage = `url(${image})`;
}

/**
 * Añadimos los listeners necesarios:
 * - al botón visible para generar el click automático
 * - al campo oculto para cuando cambie su value
 */
uploadBtn.addEventListener('click', fakeFileClick);
fileField.addEventListener('change', getImage);

'use strict';

//variables para los inputs//

const inputBlue = document.querySelector('.js-input-blue');
const inputRed = document.querySelector('.js-input-red');
const inputYellow = document.querySelector('.js-input-yellow');

//variable para el fondo de los iconos

const colorIconBackgroundMail = document.querySelector('.js-background-email');
const colorIconBackgroundPhone = document.querySelector('.js-background-phone');
const colorIconBackgroundLinkedin = document.querySelector(
  '.js-background-linkedin'
);
const colorIconBackgroundGithub = document.querySelector(
  '.js-background-github'
);

//variables inputs cambio
// let inputValueEmail = inputEmail.value;
// let inputValueGithub = inputGithub.value;
// let inputValuePhone = inputPhone.value;
// let inputValueLinkedin = inputLinkedin.value;

//colores de fondo

// const backgroundBlue = 'style-blue-background-icon';
// const backgroundYellow = 'style-yellow-background-icon';
// const backgroundRed = 'style-red-background-icon';

// function changeIconBackground() {
//   const iconBackground = document.querySelector('.js-icon-background');
//   console.log(iconBackground);

//   if (inputBlue.checked) {
//     let iconBackground = 'style-blue-background-icon';
//   } else if (inputYellow.checked) {
//     let iconBackground = 'style-yellow-background-icon';
//   } else if (inputRed.checked) {
//     let iconBackground = 'style-red-background-icon';
//   }

//   if (inputValueEmail.length !== 0) {
//     colorIconBackgroundMail.classList.add(iconBackground);
//   } else {
//     colorIconBackgroundMail.classList.remove(iconBackground);
//   }

//   if (inputValueGithub.length !== 0) {
//     colorIconBackgroundGithub.classList.add(iconBackground);
//   } else {
//     colorIconBackgroundGithub.classList.remove(iconBackground);
//   }

//   if (inputValuePhone.length !== 0) {
//     colorIconBackgroundPhone.classList.add(iconBackground);
//   } else {
//     colorIconBackgroundPhone.classList.remove(iconBackground);
//   }

//   if (inputValueLinkedin.length !== 0) {
//     colorIconBackgroundLinkedin.classList.add(iconBackground);
//   } else {
//     colorIconBackgroundLinkedin.classList.remove(iconBackground);
//   }
// }

function iconChangeBlue() {
  // valores de los inputs

  let inputValueEmail = input.email.value;
  let inputValueGithub = input.github.value;
  let inputValuePhone = input.phone.value;
  let inputValueLinkedin = input.linkedin.value;

  if (inputValueEmail.length !== 0 && inputBlue.checked) {
    colorIconBackgroundMail.classList.add('style-blue-background-icon');
  } else {
    colorIconBackgroundMail.classList.remove('style-blue-background-icon');
  }
  if (inputValueGithub.length !== 0 && inputBlue.checked) {
    colorIconBackgroundGithub.classList.add('style-blue-background-icon');
  } else {
    colorIconBackgroundGithub.classList.remove('style-blue-background-icon');
  }
  if (inputValueLinkedin.length !== 0 && inputBlue.checked) {
    colorIconBackgroundLinkedin.classList.add('style-blue-background-icon');
  } else {
    colorIconBackgroundLinkedin.classList.remove('style-blue-background-icon');
  }
  if (inputValuePhone.length !== 0 && inputBlue.checked) {
    colorIconBackgroundPhone.classList.add('style-blue-background-icon');
  } else {
    colorIconBackgroundPhone.classList.remove('style-blue-background-icon');
  }
}

function iconChangeYellow() {
  let inputValueEmail = input.email.value;
  let inputValueGithub = input.github.value;
  let inputValuePhone = input.phone.value;
  let inputValueLinkedin = input.linkedin.value;

  if (inputValueEmail.length !== 0 && inputYellow.checked) {
    colorIconBackgroundMail.classList.add('style-yellow-background-icon');
  } else {
    colorIconBackgroundMail.classList.remove('style-yellow-background-icon');
  }
  if (inputValueGithub.length !== 0 && inputYellow.checked) {
    colorIconBackgroundGithub.classList.add('style-yellow-background-icon');
  } else {
    colorIconBackgroundGithub.classList.remove('style-yellow-background-icon');
  }
  if (inputValueLinkedin.length !== 0 && inputYellow.checked) {
    colorIconBackgroundLinkedin.classList.add('style-yellow-background-icon');
  } else {
    colorIconBackgroundLinkedin.classList.remove(
      'style-yellow-background-icon'
    );
  }
  if (inputValuePhone.length !== 0 && inputYellow.checked) {
    colorIconBackgroundPhone.classList.add('style-yellow-background-icon');
  } else {
    colorIconBackgroundPhone.classList.remove('style-yellow-background-icon');
  }
}

function iconChangeRed() {
  //valores de los inputs

  let inputValueEmail = input.email.value;
  let inputValueGithub = input.github.value;
  let inputValuePhone = input.phone.value;
  let inputValueLinkedin = input.linkedin.value;

  if (inputValueEmail.length !== 0 && inputRed.checked) {
    colorIconBackgroundMail.classList.add('style-red-background-icon');
  } else {
    colorIconBackgroundMail.classList.remove('style-red-background-icon');
  }
  if (inputValueGithub.length !== 0 && inputRed.checked) {
    colorIconBackgroundGithub.classList.add('style-red-background-icon');
  } else {
    colorIconBackgroundGithub.classList.remove('style-red-background-icon');
  }
  if (inputValueLinkedin.length !== 0 && inputRed.checked) {
    colorIconBackgroundLinkedin.classList.add('style-red-background-icon');
  } else {
    colorIconBackgroundLinkedin.classList.remove('style-red-background-icon');
  }
  if (inputValuePhone.length !== 0 && inputRed.checked) {
    colorIconBackgroundPhone.classList.add('style-red-background-icon');
  } else {
    colorIconBackgroundPhone.classList.remove('style-red-background-icon');
  }
}

function iconChangeGeneral() {
  iconChangeBlue();
  iconChangeRed();
  iconChangeYellow();
}

input.email.addEventListener('keyup', iconChangeGeneral);
input.github.addEventListener('keyup', iconChangeGeneral);
input.linkedin.addEventListener('keyup', iconChangeGeneral);
input.phone.addEventListener('keyup', iconChangeGeneral);

// input.email.addEventListener('keyup', iconChangeRed);
// input.github.addEventListener('keyup', iconChangeRed);
// input.linkedin.addEventListener('keyup', iconChangeRed);
// input.phone.addEventListener('keyup', iconChangeRed);

// input.email.addEventListener('keyup', iconChangeYellow);
// input.github.addEventListener('keyup', iconChangeYellow);
// input.linkedin.addEventListener('keyup', iconChangeYellow);
// input.phone.addEventListener('keyup', iconChangeYellow);

'use strict';

function buttonActive() {
  let inputValueName = input.name.value;
  let inputValueJob = input.job.value;
  let inputValueEmail = input.email.value;
  let inputValueGithub = input.github.value;
  let inputValuePhone = input.phone.value;
  let inputValueLinkedin = input.linkedin.value;

  if (
    inputValueName.length !== 0 &&
    inputValueJob.length !== 0 &&
    inputValueEmail.length !== 0 &&
    inputValueGithub.length !== 0 &&
    inputValuePhone.length !== 0 &&
    inputValueLinkedin.length !== 0
  ) {
    buttonCard.classList.toggle('active');
    buttonCard.classList.toggle('inactive');
  }
}

//# sourceMappingURL=main.js.map
