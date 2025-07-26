export {
  getResponse,
  getInitialCards,
  getProfileData,
  addNewCardAPI,
  deleteCardAPI,
  saveProfileData,
  changeAvatar,
  addLike,
  deleteLike,
  authorizationConfig,
};

const authorizationConfig = {
  cohortUrl: "https://mesto.nomoreparties.co/v1/wff-cohort-42",
  headers: {
    authorization: "bde4b590-e4d9-4aad-8c9a-0daadfa70e1a",
    "Content-Type": "application/json",
  },
};

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Error: ${res.status}`);
  }
  return res.json();
}

function getInitialCards() {
  return fetch(`${authorizationConfig.cohortUrl}/cards`, {
    method: "GET",
    headers: authorizationConfig.headers,
  }).then(getResponse);
}

function getProfileData() {
  return fetch(`${authorizationConfig.cohortUrl}/users/me`, {
    method: "GET",
    headers: authorizationConfig.headers,
  }).then(getResponse);
}

function addNewCardAPI(inputCardNameValue, inputUrlValue) {
  return fetch(`${authorizationConfig.cohortUrl}/cards`, {
    method: "POST",
    headers: authorizationConfig.headers,
    body: JSON.stringify({
      name: inputCardNameValue,
      link: inputUrlValue,
    }),
  }).then(getResponse);
}

function deleteCardAPI(cardId) {
  return fetch(`${authorizationConfig.cohortUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: authorizationConfig.headers,
  }).then(getResponse);
}

function saveProfileData(nameInputValue, aboutInputValue) {
  return fetch(`${authorizationConfig.cohortUrl}/users/me`, {
    method: "PATCH",
    headers: authorizationConfig.headers,
    body: JSON.stringify({
      name: nameInputValue,
      about: aboutInputValue,
    }),
  }).then(getResponse);
}

function changeAvatar(avatarSrc) {
  return fetch(`${authorizationConfig.cohortUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: authorizationConfig.headers,
    body: JSON.stringify({
      avatar: avatarSrc,
    }),
  }).then(getResponse);
}

function addLike(cardId) {
  return fetch(`${authorizationConfig.cohortUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: authorizationConfig.headers,
  }).then(getResponse);
}

function deleteLike(cardId) {
  return fetch(`${authorizationConfig.cohortUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: authorizationConfig.headers,
  }).then(getResponse);
}
