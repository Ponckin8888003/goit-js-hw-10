import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let delayValue = document.querySelector('input[name="delay"]');
let form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
  event.preventDefault();
  let delay = Number(delayValue.value);
  let fieldset = document.querySelector('input[name="state"]:checked');

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (fieldset.value === 'fulfilled') {
        resolve(delay);
      } else if (fieldset.value === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.success({
        title: '',
        message: `Fulfilled promise in ${value}ms`,
      });
    })
    .catch(error => {
      iziToast.error({
        title: '',
        message: `Rejected promise in ${error}ms`,
      });
    })
    .finally(() => {
      form.reset();
    });
});
