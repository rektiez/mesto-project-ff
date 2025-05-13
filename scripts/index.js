// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

// @todo: DOM узлы
const placesList = document.querySelector('.places__list')

// @todo: Функция создания карточки
function createCard(cardInfo, deleteCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardImage.src = cardInfo.link;
    cardImage.alt = cardInfo.name;
    cardTitle.textContent = cardInfo.name;
    deleteButton.addEventListener('click',() => deleteCard(cardElement));
    return cardElement;
    
    
}
// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardInfo) => {
    const cardElement = createCard(cardInfo, deleteCard)
    placesList.prepend(cardElement)
})