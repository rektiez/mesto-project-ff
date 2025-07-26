import { deleteCardAPI, addLike, deleteLike } from "../scripts/api.js";

function createCard(cardData, userId, enlargeCardImage) {
  const cardElement = document
    .querySelector("#card-template")
    .content.querySelector(".places__item")
    .cloneNode(true);

  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likesCounter = cardElement.querySelector(".card__like-count");
 
  const placeName = cardData.name;
  const placeLink = cardData.link;
  const cardId = cardData._id;
  const ownerId = cardData.owner._id;

  const placeLikes = cardData.likes;
  const amountLikes = placeLikes.length;

  cardTitle.textContent = placeName;
  cardImage.src = placeLink;
  cardImage.alt = placeName;

  if (ownerId === userId) {
    deleteButton.addEventListener("click", () => {
      deleteCard(cardId, cardElement);
    });
  } else {
    deleteButton.remove();
  }

  likeButton.addEventListener("click", (evt) =>
    toggleLike(evt, cardId, likesCounter)
  );

  cardImage.addEventListener("click", () =>
    enlargeCardImage(cardData)
  );

  const isLiked = placeLikes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  if (amountLikes) {
    likesCounter.textContent = amountLikes || 0
  } else {
    likesCounter.textContent = 0;
  }

  return cardElement;
}

function toggleLike(evt, cardId, likesCounter) {
  const isLiked = evt.target.classList.contains("card__like-button_is-active");
  const likeMethod = isLiked ? deleteLike : addLike;

  likeMethod(cardId)
    .then((card) => {
      evt.target.classList.toggle("card__like-button_is-active");
      likesCounter.textContent = card.likes.length;
    })
    .catch((err) => console.log(err));
}

function deleteCard(cardId, cardElement) {
  deleteCardAPI(cardId)
    .then(() => {
      cardElement.remove();
      console.log("Карточка успешно удалена");
    })
    .catch((err) => {
      console.log(err);
    });
}

export { createCard };