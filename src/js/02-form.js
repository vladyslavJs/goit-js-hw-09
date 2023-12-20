'use strict';

const feedbackForm = document.querySelector('.feedback-form');

const localStorageKey = 'feedback-form-state';

const input = feedbackForm.elements.email;
const textarea = feedbackForm.elements.message;

const savedState = localStorage.getItem(localStorageKey);

if (savedState ?? false) {
  try {
    const parsedState = JSON.parse(savedState);

    if (parsedState.email !== undefined && parsedState.message !== undefined) {
      input.value = parsedState.email;
      textarea.value = parsedState.message;
    }
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }
}

feedbackForm.addEventListener('input', () => {
  const feedback = {
    email: input.value.trim(),
    message: textarea.value.trim(),
  };

  localStorage.setItem(localStorageKey, JSON.stringify(feedback));
});

feedbackForm.addEventListener('submit', e => {
  e.preventDefault();

  if (input.value.trim() === '' || textarea.value.trim() === '') {
    alert('You need to write a message!');
    return;
  }

  localStorage.removeItem(localStorageKey);
  console.log({
    email: input.value.trim(),
    message: textarea.value.trim(),
  });
  feedbackForm.reset();
});