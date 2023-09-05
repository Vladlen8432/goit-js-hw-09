function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const form = document.querySelector('.form');
  const delayInput = form.querySelector('input[name = "delay"]');
  const stepInput = form.querySelector('input[name = "step"]');
  const amountInput = form.querySelector('input[name = "amount"]');

  const initialDelay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  for (let i = 0; i < amount; i++) {
    const currentDelay = initialDelay + i * step;
    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        console.log(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`Rejected promise ${position} in ${delay}ms`);
      });
  }
}

const form = document.querySelector('.form');
form.addEventListener('submit', handleFormSubmit);
