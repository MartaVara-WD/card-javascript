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
