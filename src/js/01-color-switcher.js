const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let timerId = null;
const onStart = () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  timerId = setInterval(() => {
    body.style.background = getRandomHexColor();
  }, 1000);
};

const onStop = () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timerId);
};

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);
