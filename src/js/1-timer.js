
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let timerId = null;

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];
        const now = new Date();

        if (userSelectedDate && userSelectedDate > now) {
            startBtn.disabled = false;
        } else {
            startBtn.disabled = true;
            iziToast.error({
                message: "Please choose a date in the future",
            });
        };
    },
};

flatpickr(input, options);


function addLeadingZero(value) {
    return String(value).padStart(2, "0");
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


startBtn.addEventListener("click", () => {
    if (!userSelectedDate) {
        return;
    }

    startBtn.disabled = true;
    input.disabled = true;
    input.value = '';

    timerId = setInterval(() => {
      const nowDate = new Date();
      const diffTime = userSelectedDate - nowDate;

      if (diffTime <= 0) {
        clearInterval(timerId);
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minutesEl.textContent = "00";
        secondsEl.textContent = "00";

        input.disabled = false;
        startBtn.disabled = true;
          
        return;
      }
        
      const { days, hours, minutes, seconds } = convertMs(diffTime);
      daysEl.textContent = addLeadingZero(days); 
      hoursEl.textContent = addLeadingZero(hours);
      minutesEl.textContent = addLeadingZero(minutes);
      secondsEl.textContent = addLeadingZero(seconds);
    }, 1000);
});