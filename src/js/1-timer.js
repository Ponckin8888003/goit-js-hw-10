import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let inputFlatpickr = document.querySelector('#datetime-picker');
let startButton = document.querySelector('button');
let userSelectedDate;
let daysValue = document.querySelector('[data-days]');
let hoursValue = document.querySelector('[data-hours]');
let minutesValue = document.querySelector('[data-minutes]');
let secondsValue = document.querySelector('[data-seconds]');

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() >= selectedDates[0]) {
      startButton.disabled = true;
      iziToast.error({
        title: '',
        message: 'Please choose a date in the future',
      });
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

startButton.addEventListener('click', event => {
  startButton.disabled = true;
  inputFlatpickr.disabled = true;

  let intervalId = setInterval(() => {
    let remainingTime = userSelectedDate - new Date();

    if (remainingTime <= 0) {
      clearInterval(intervalId);
      inputFlatpickr.disabled = false;
      daysValue.textContent = '00';
      hoursValue.textContent = '00';
      minutesValue.textContent = '00';
      secondsValue.textContent = '00';
      return;
    }

    let timeObject = convertMs(remainingTime);

    daysValue.textContent = addLeadingZero(timeObject.days);
    hoursValue.textContent = addLeadingZero(timeObject.hours);
    minutesValue.textContent = addLeadingZero(timeObject.minutes);
    secondsValue.textContent = addLeadingZero(timeObject.seconds);
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr(inputFlatpickr, options);
