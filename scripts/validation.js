// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

//checks to see if the input is invalid
function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

function disableButton(submitButton, options) {
  submitButton.classList.add(options.inactiveButtonClass);
  submitButton.disabled = true;
}

function enableButton(submitButton, options) {
  submitButton.classList.remove(options.inactiveButtonClass);
  submitButton.disabled = false;
}

function toggleButtonState(inputEls, submitButton, options) {
  if (hasInvalidInput(inputEls)) {
    disableButton(submitButton, options);
    return;
  }
  enableButton(submitButton, options);
}

function checkInputValidity(formEl, inputEl, options) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, options);
  } else {
    hideInputError(formEl, inputEl, options);
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(options.submitButtonSelector);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
      console.log(e);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
    // Look for all inputs inside of form
    // loop through all inputs to see if all are valid
    // -- if input is not valid
    // ---- get validation message
    // ---- add error class to input
    // ---- display error message
    // ---- disable button
    // -- else
    // ---- enable button
    // ---- reset error messages
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__form-input-error",
  errorClass: "modal__form-error",
};

enableValidation(config);

// When modal opened-> add event listener and if evt.target not ".modal__container"
// then closePopup and remove event listener

// add event listener for background of modal to close modal, remove when modal closed
// add event listener keydown with .key ='Escape' to close
// css styles for error messages (imported)
