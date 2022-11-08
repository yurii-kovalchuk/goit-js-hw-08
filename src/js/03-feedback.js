import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const inputRef = document.querySelector('input');
const textareaRef = document.querySelector('textarea');

formRef.addEventListener('input', throttle(onInput, 500));
formRef.addEventListener('submit', onSubmit);

let currentFeedback = { email: '', message: '' };

let initFeedback = localStorage.getItem('feedback-form-state');
if (initFeedback) {
  currentFeedback = JSON.parse(initFeedback);
  inputRef.value = currentFeedback.email;
  textareaRef.value = currentFeedback.message;
}

function onInput(e) {
  if (e.target.name === 'email') {
    currentFeedback.email = e.target.value.trim();
  }
  if (e.target.name === 'message') {
    currentFeedback.message = e.target.value.trim();
  }
  localStorage.setItem('feedback-form-state', JSON.stringify(currentFeedback));
}

function onSubmit(e) {
  e.preventDefault();
  if (inputRef.value === '' || textareaRef.value.trim() === '') {
    return alert('Please fill in all the fields!');
  }
  console.log(currentFeedback);
  localStorage.removeItem('feedback-form-state');
  e.currentTarget.reset();
  currentFeedback = { email: '', message: '' };
}
