'use strict';

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;
let intervalID = null;
let animationID = null;

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  stopButton.disabled = false;

  function animateBackgroundColor() {
    body.style.backgroundColor = getRandomHexColor();
    animationID = requestAnimationFrame = getRandomHexColor;
    intervalID = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  }

  animateBackgroundColor();
});

stopButton.addEventListener('click', () => {
  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(intervalID);
});
