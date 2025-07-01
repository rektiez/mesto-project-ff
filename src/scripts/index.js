import "../pages/index.css";
import { initialCards } from "../components/cards";
import { openModal, closeModal} from "../scripts/modals.js";
// Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// DOM
const placesList = document.querySelector(".places__list"); 
const modalWindowImage = document.querySelector(".popup_type_image");
const modalImage = modalWindowImage.querySelector(".popup__image");
const modalDescription = modalWindowImage.querySelector(".popup__caption");





// Функция создания карточки
function createCard(cardInfo, deleteCard, likeCard, imageOpen ) {
 const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;
 
  cardImage.addEventListener('click', () =>
        ImageOpen(cardInfo.name, cardInfo.link));
  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  likeButton.addEventListener("click", () => likeCard(likeButton));
  return cardElement;
}
// Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

function ImageOpen(title, link) {
  modalImage.src = link;
  modalImage.alt = title;
  modalDescription.textContent = title;
  
  openModal(modalWindowImage);


}

// Вывод карточки на страницу
initialCards.forEach((cardInfo) => {
  const cardElement = createCard(cardInfo, deleteCard, likeCard,);
  placesList.prepend(cardElement);
});

