import "../pages/index.css";
import { initialCards } from "../components/cards";
import {
  createCard,
  deleteCard,
  likeCard,
  imageOpen,
  addNewCard,
} from "../components/card.js";

const placesList = document.querySelector(".places__list");
const modalWindowAddCard = document.querySelector(".popup_type_new-card");
const addCardForm = document.querySelector(".popup_type_new-card .popup__form");

addCardForm.addEventListener("submit", (evt) =>
  addNewCard(evt, placesList, modalWindowAddCard, addCardForm)
);

initialCards.forEach((cardInfo) => {
  const cardElement = createCard(cardInfo, deleteCard, likeCard, imageOpen);
  placesList.prepend(cardElement);
});
