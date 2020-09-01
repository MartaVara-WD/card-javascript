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
