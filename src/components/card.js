import { openModal, closeModal } from "../components/modals.js";

function createCard(cardInfo, deleteCard, likeCard, imageOpen) {
  const cardElement = document
    .querySelector("#card-template")
    .content.querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;

  cardImage.addEventListener("click", () => {
    imageOpen(cardInfo.name, cardInfo.link);
  });

  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  likeButton.addEventListener("click", () => {
    likeCard(likeButton);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

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
export { createCard, deleteCard, likeCard, imageOpen, addNewCard };
