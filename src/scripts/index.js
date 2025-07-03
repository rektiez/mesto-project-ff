import "../pages/index.css";
import { initialCards } from "../components/cards";
import {
  openModal,
  closeModal,
  clickOutsideModal,
} from "../components/modal.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";

const placesList = document.querySelector(".places__list");

const modalWindowAddCard = document.querySelector(".popup_type_new-card");
const addCardForm = document.querySelector(".popup_type_new-card .popup__form");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const modalWindowEdit = document.querySelector(".popup_type_edit");
const modalWindowAdd = document.querySelector(".popup_type_new-card");
const closeButtons = document.querySelectorAll(".popup__close");

const formElement = document.querySelector(".popup__form");
const nameInput = modalWindowEdit.querySelector('input[name="name"]');
const jobInput = modalWindowEdit.querySelector('input[name="description"]');

const profileNameElement = document.querySelector(".profile__title");
const profileJobElement = document.querySelector(".profile__description");

addCardForm.addEventListener("submit", (evt) =>
  addNewCard(evt, placesList, modalWindowAddCard, addCardForm)
);

initialCards.forEach((cardInfo) => {
  const cardElement = createCard(cardInfo, deleteCard, likeCard, imageOpen);
  placesList.append(cardElement);
});

function imageOpen(title, link) {
  const modalImage = document.querySelector(".popup_type_image .popup__image");
  const modalDescription = document.querySelector(
    ".popup_type_image .popup__caption"
  );

  modalImage.src = link;
  modalImage.alt = title;
  modalDescription.textContent = title;

  openModal(document.querySelector(".popup_type_image"));
}

function addNewCard(evt, placesList, modalWindowAdd, addCardForm) {
  evt.preventDefault();

  const cardTitleInput = addCardForm.querySelector('[name="place-name"]');
  const cardLinkInput = addCardForm.querySelector('[name="link"]');

  const title = cardTitleInput.value;
  const link = cardLinkInput.value;

  const newCard = { name: title, link: link };
  const cardElement = createCard(newCard, deleteCard, likeCard, imageOpen);
  placesList.prepend(cardElement);

  cardTitleInput.value = "";
  cardLinkInput.value = "";

  closeModal(modalWindowAdd);
}

document.addEventListener("click", clickOutsideModal);

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  openModal(modalWindowEdit);
});

addCardButton.addEventListener("click", () => openModal(modalWindowAdd));

closeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const modal = event.target.closest(".popup_is-opened");
    closeModal(modal);
  });
});

formElement.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newName = nameInput.value;
  const newJob = jobInput.value;

  if (profileNameElement) {
    profileNameElement.textContent = newName;
  }

  if (profileJobElement) {
    profileJobElement.textContent = newJob;
  }

  closeModal(modalWindowEdit);
});
