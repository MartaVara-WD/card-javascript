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
