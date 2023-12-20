'use strict';

const feedbackForm = document.querySelector('.feedback-form');

const localStorageKey = 'feedback-form-state';

const input = feedbackForm.elements.email;
const textarea = feedbackForm.elements.message;

const savedInformation = localStorage.getItem(localStorageKey);

if (savedInformation ?? false) {
  try {
    const parsedInformation = JSON.parse(savedInformation);

    if (parsedInformation.email !== undefined && parsedInformation.message !== undefined) {
      input.value = parsedInformation.email;
      textarea.value = parsedInformation.message;
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
    alert('Please enter message correctly');
    return;
  }

  localStorage.removeItem(localStorageKey);
  console.log({
    email: input.value.trim(),
    message: textarea.value.trim(),
  });
  feedbackForm.reset();
});

