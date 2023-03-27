import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  } else {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  }
}

function handleSubmit (event) {
  event.preventDefault();
  const inputs = document.querySelectorAll('input');
  const firstDelay = parseInt(inputs[0].value);
  const delayStep = parseInt(inputs[1].value);
  const amount = parseInt(inputs[2].value);

  for (let i = 0; i < amount; i++) {
    const position = 1 + i;
    const delay = firstDelay + (delayStep * i);

    setTimeout(() => {
      createPromise(position, delay);
    }, delay);
  }
}