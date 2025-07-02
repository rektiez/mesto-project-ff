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
modalWindowAdd.classList.add("popup_is-animated");

function openModal(modal) {
  modal.classList.add("popup_is-animated");
  setTimeout(() => {
    modal.classList.add("popup_is-opened");
  }, 0);

  document.addEventListener("keydown", EscapeCloseModal);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  setTimeout(() => {
    modal.classList.remove("popup_is-animated");
  }, 600);
  document.removeEventListener("keydown", EscapeCloseModal);
}

closeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const modal = event.target.closest(".popup_is-opened");
    closeModal(modal);
  });
});

function EscapeCloseModal(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) closeModal(openedModal);
  }
}

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileJobElement.textContent;
  openModal(modalWindowEdit);
});

addCardButton.addEventListener("click", () => openModal(modalWindowAdd));

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

function clickOutsideModal(evt) {
  if (evt.target.classList.contains("popup")) {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}
document.addEventListener("click", clickOutsideModal);

export { openModal, closeModal };
