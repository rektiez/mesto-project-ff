function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.add(settings.inputErrorClass);

  if (errorElement) {
    errorElement.textContent = errorMessage || inputElement.validationMessage;
    errorElement.classList.add(settings.errorClass);
  }
}

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
  inputElement.classList.remove(settings.inputErrorClass);

  if (errorElement) {
    errorElement.textContent = '';
    errorElement.classList.remove(settings.errorClass);
  }
}

function isValid(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    if (inputElement.validity.patternMismatch && inputElement.dataset.errorMessage) {
      showInputError(
        formElement,
        inputElement,
        inputElement.dataset.errorMessage,
        settings
      );
    } else {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        settings
      );
    }
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function clearValidation(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
  });

  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
}

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, settings);
  });
}

export { enableValidation, clearValidation };