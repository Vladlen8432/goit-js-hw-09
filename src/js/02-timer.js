import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      window.alert('Please choose a date in the future');
      dateTimePicker.value = '';
    }

    console.log(selectedDate);
    checkStartButtonState();
  },
};

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

console.log(convertMs(2000));
console.log(convertMs(140000));
console.log(convertMs(24140000));

flatpickr(dateTimePicker, options);

const startButton = document.querySelector('[data-start]');

function checkStartButtonState() {
  const selectedDate = flatpickr.parseDate(dateTimePicker.value, 'Y-m-d H:i');
  const currentDate = new Date();

  if (selectedDate > currentDate) {
    startButton.removeAttribute('disabled');
  } else {
    startButton.setAttribute('disabled', 'disabled');
  }
}

checkStartButtonState();

const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

function startCountdown() {
  let currentDate = new Date();

  let countdownInterval = setInterval(() => {
    const selectedDate = flatpickr.parseDate(dateTimePicker.value, 'Y-m-d H:i');
    const timeDifference = selectedDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimeFields(0, 0, 0, 0);
      checkStartButtonState();
      return;
    }

    currentDate = new Date();

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimeFields(days, hours, minutes, seconds);

    timeDifference -= 1000;
  }, 1000);
}

function updateTimeFields(days, hours, minutes, seconds) {
  timerFields.days.textContent = addLeadingZero(days);
  timerFields.hours.textContent = addLeadingZero(hours);
  timerFields.minutes.textContent = addLeadingZero(minutes);
  timerFields.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startButton.addEventListener('click', startCountdown);
