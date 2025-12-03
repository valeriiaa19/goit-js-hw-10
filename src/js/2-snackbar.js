import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();
  const inputDelay = event.target.elements.delay.value;
  const inputState = event.target.elements.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (inputState === 'fulfilled') {
        resolve(inputDelay);
        console.log(`✅ Fulfilled promise in ${inputDelay}ms`);
      } else {
        reject(inputDelay);
        console.log(`❌ Rejected promise in ${inputDelay}ms`);
      }
    }, Number(inputDelay));
  })
    .then(delay => {
      iziToast.success({
        title: "OK",
        message: `✅ Fulfilled promise in ${inputDelay}ms`,
        position: 'topRight',
        backgroundColor: "#59a10d",
        titleColor: "#fff",
        messageColor: "#fff",
      });
    })
    .catch(delay => {
      iziToast.error({
        title: "Error",
        message: `❌ Rejected promise in ${inputDelay}ms`,
        position: 'topRight',
        backgroundColor: "#ef4040",
        titleColor: "#fff",
        messageColor: "#fff",
      });
    })
    .finally(() => {
      event.target.elements.delay.value = '';
      const radios = event.target.elements.state;
      Array.from(radios).forEach(radio => radio.checked = false);
    });
});