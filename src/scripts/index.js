import "../pages/index.css";
import {
  openModal,
  closeModal,
  clickOutsideModal,
} from "../components/modal.js";
import { createCard } from "../components/card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getProfileData,
  getInitialCards,
  addNewCardAPI,
  saveProfileData,
  changeAvatar,
} from "./api.js";


const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const profileConfig = {
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
};

const placesList = document.querySelector(".places__list");

const profileNameElement = document.querySelector(".profile__title");
const profileJobElement = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const modalWindowEdit = document.querySelector(".popup_type_edit");
const editFormElement = document.querySelector(".popup_type_edit .popup__form");
const nameInput = modalWindowEdit.querySelector('input[name="name"]');
const jobInput = modalWindowEdit.querySelector('input[name="description"]');

const modalWindowAdd = document.querySelector(".popup_type_new-card");
const addCardForm = document.querySelector(".popup_type_new-card .popup__form");
const placeInput = modalWindowAdd.querySelector('input[name="place-name"]');
const srcImageInput = modalWindowAdd.querySelector('input[name="link"]');

const popupUpdateAvatar = document.querySelector(".popup_type_update-avatar");
const formUpdateAvatar = document.forms["update-avatar"];
const srcAvatarInput = popupUpdateAvatar.querySelector(
  'input[name="avatar-link"]'
);

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupImageCaption = popupTypeImage.querySelector(".popup__caption");

const closeButtons = document.querySelectorAll(".popup__close");

enableValidation(validationConfig);

Promise.all([getProfileData(), getInitialCards()])
  .then(([profileData, cardsArrayData]) => {
    const userId = profileData._id;

    document.querySelector(profileConfig.nameSelector).textContent =
      profileData.name;
    document.querySelector(profileConfig.descriptionSelector).textContent =
      profileData.about;
    document.querySelector(
      profileConfig.avatarSelector
    ).style.backgroundImage = `url(${profileData.avatar})`;

    cardsArrayData.forEach((cardData) => {
      const cardElement = createCard(cardData, userId, imageOpen);
      placesList.append(cardElement);
    });
    console.log("Данные профиля и карточек успешно загружены с сервера");
  })
  .catch((err) => {
    console.log("Ошибка при загрузке данных:", err);
  });

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  clearValidation(modalWindowEdit, validationConfig);
  openModal(modalWindowEdit);
});

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  clearValidation(modalWindowAdd, validationConfig);
  openModal(modalWindowAdd);
});

profileImage.addEventListener("click", () => {
  formUpdateAvatar.reset();
  clearValidation(popupUpdateAvatar, validationConfig);
  openModal(popupUpdateAvatar);
});

editFormElement.addEventListener("submit", handleFormProfileEditSubmit);
addCardForm.addEventListener("submit", handleFormNewCardSubmit);
formUpdateAvatar.addEventListener("submit", handleFormUpdateAvatarSubmit);

addEventListenersForCloseModal(modalWindowEdit);
addEventListenersForCloseModal(modalWindowAdd);
addEventListenersForCloseModal(popupTypeImage);
addEventListenersForCloseModal(popupUpdateAvatar);

function handleFormProfileEditSubmit(evt) {
  evt.preventDefault();
  waitSubmitForm(evt.target, "start");

  saveProfileData(nameInput.value, jobInput.value)
    .then((res) => {
      profileNameElement.textContent = res.name;
      profileJobElement.textContent = res.about;
      closeModal(modalWindowEdit);
      evt.target.reset();
      console.log("Данные профиля успешно сохранены");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      waitSubmitForm(evt.target, "end");
    });
}

function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  waitSubmitForm(evt.target, "start");

  addNewCardAPI(placeInput.value, srcImageInput.value)
    .then((resultCardData) => {
      const userId = resultCardData.owner._id;

      const cardElement = createCard(resultCardData, userId, imageOpen);
      placesList.prepend(cardElement);
      closeModal(modalWindowAdd);
      evt.target.reset();
      console.log("Карточка успешно добавлена");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      waitSubmitForm(evt.target, "end");
    });
}

function handleFormUpdateAvatarSubmit(evt) {
  evt.preventDefault();
  waitSubmitForm(evt.target, "start");

  changeAvatar(srcAvatarInput.value)
    .then((resultData) => {
      profileImage.style.backgroundImage = `url(${resultData.avatar})`;
      closeModal(popupUpdateAvatar);
      evt.target.reset();
      console.log("Аватар успешно добавлен");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      waitSubmitForm(evt.target, "end");
    });
}

function waitSubmitForm(form, waitingPosition) {
  const submitButton = form.querySelector(".popup__button");
  switch (waitingPosition) {
    case "start": {
      submitButton.textContent += "...";
      break;
    }
    case "end": {
      submitButton.textContent = submitButton.textContent.replace("...", "");
    }
  }
}

function addEventListenersForCloseModal(popup) {
  const crossToClose = popup.querySelector(".popup__close");
  crossToClose.addEventListener("click", () => closeModal(popup));
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
}

function imageOpen(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupImageCaption.textContent = cardData.name;
  openModal(popupTypeImage);
}

document.addEventListener("click", clickOutsideModal);

closeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const currentWindow = event.target.closest(".popup");
    closeModal(currentWindow);
  });
});
