import "../pages/index.css";
import { initialCards } from "../components/cards";
import { openModal, closeModal } from "../scripts/modals.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const modalWindowImage = document.querySelector(".popup_type_image");
const modalImage = modalWindowImage.querySelector(".popup__image");
const modalDescription = modalWindowImage.querySelector(".popup__caption");
const modalWindowAdd = document.querySelector(".popup_type_new-card");
const addCardForm = document.querySelector(".popup_type_new-card .popup__form");

function createCard(cardInfo, deleteCard, likeCard, imageOpen) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;

  cardImage.addEventListener("click", () =>
    imageOpen(cardInfo.name, cardInfo.link)
  );
  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  likeButton.addEventListener("click", () => likeCard(likeButton));
  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

function imageOpen(title, link) {
  modalImage.src = link;
  modalImage.alt = title;
  modalDescription.textContent = title;

  openModal(modalWindowImage);
}

function AddNewCard(evt) {
  evt.preventDefault();

  const cardTitleInput = addCardForm.querySelector('[name="place-name"]');
  const cardLinkInput = addCardForm.querySelector('[name="link"]');

  const title = cardTitleInput.value;
  const link = cardLinkInput.value;

  const newCard = { name: title, link: link };
  const cardElement = createCard(newCard, deleteCard, likeCard, imageOpen);

  cardTitleInput.value = "";
  cardLinkInput.value = "";

  placesList.prepend(cardElement);

  closeModal(modalWindowAdd);
}

addCardForm.addEventListener("submit", AddNewCard);

initialCards.forEach((cardInfo) => {
  const cardElement = createCard(cardInfo, deleteCard, likeCard, imageOpen);
  placesList.prepend(cardElement);
});
