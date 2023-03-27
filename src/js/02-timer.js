import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
let timerValues = document.querySelectorAll('.value');

startBtn.disabled = true;
let selected;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
      selected = selectedDates[0];
    }
  },
};
flatpickr('#datetime-picker', options);
let ms = 0;
let timerId = null;

const onClick = () => {
  const selectedTime = selected.getTime();
  timerId = setInterval(() => {
    const todayTime = new Date().getTime();
    ms = selectedTime - todayTime;
    console.log(convertMs(ms));
    timerValues[0].textContent = addLeadingZero(convertMs(ms).days);
    timerValues[1].textContent = addLeadingZero(convertMs(ms).hours);
    timerValues[2].textContent = addLeadingZero(convertMs(ms).minutes);
    timerValues[3].textContent = addLeadingZero(convertMs(ms).seconds);
    if (convertMs(ms).seconds <= 0) {
      clearInterval(timerId);
    }

    function addLeadingZero(value) {
      return value.toString().padStart(2, '0');
    }

    function convertMs(ms) {
      // Number of milliseconds per unit of time
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;

      // Remaining days
      const days = Math.floor(ms / day);
      // Remaining hours
      const hours = Math.floor((ms % day) / hour);
      // Remaining minutes
      const minutes = Math.floor(((ms % day) % hour) / minute);
      // Remaining seconds
      const seconds = Math.floor((((ms % day) % hour) % minute) / second);
      return { days, hours, minutes, seconds };
    }
  }, 1000);
};
startBtn.addEventListener('click', onClick);
