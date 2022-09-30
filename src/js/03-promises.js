import { createPromise, onSuccess, onError } from './helpers/promise';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const params = {};

  new FormData(e.target).forEach((value, name) => {
    params[name] = parseInt(value);
  });

  generatePromises(params);
}

function generatePromises({ delay, step, amount }) {
  let delayStep = delay;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delayStep).then(onSuccess).catch(onError);
    delayStep += step;
  }
}
