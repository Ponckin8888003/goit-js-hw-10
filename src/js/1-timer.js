// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

let inputFlatpickr = document.querySelector('#datetime-picker');
let startButton = document.querySelector('button');
let userSelectedDate;
let daysValue = document.querySelector('[data-days]');
let hoursValue = document.querySelector('[data-hours]');
let minutesValue = document.querySelector('[data-minutes]');
let secondsValue = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (new Date() > selectedDates[0]) {
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
  let intervalId = setInterval(() => {
    let remainingTime = userSelectedDate - new Date();
    let timeObject = convertMs(remainingTime);

    daysValue.textContent = addLeadingZero(timeObject.days);
    hoursValue.textContent = addLeadingZero(timeObject.hours);
    minutesValue.textContent = addLeadingZero(timeObject.minutes);
    secondsValue.textContent = addLeadingZero(timeObject.seconds);

    if (remainingTime <= 0) {
      clearInterval(intervalId);
      startButton.disabled = false;
      daysValue.textContent = '00';
      hoursValue.textContent = '00';
      minutesValue.textContent = '00';
      secondsValue.textContent = '00';
      return;
    } else {
      startButton.disabled = true;
    }
  }, 1000);
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
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

flatpickr(inputFlatpickr, options);
