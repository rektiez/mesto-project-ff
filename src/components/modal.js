function openModal(modal) {
  modal.classList.add("popup_is-animated");
  setTimeout(() => {
    modal.classList.add("popup_is-opened");
  }, 0);

  document.addEventListener("keydown", escapeCloseModal);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  setTimeout(() => {
    modal.classList.remove("popup_is-animated");
  }, 600);
  document.removeEventListener("keydown", escapeCloseModal);
}

function escapeCloseModal(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) closeModal(openedModal);
  }
}

function clickOutsideModal(evt) {
  if (evt.target.classList.contains("popup")) {
    const openedModal = document.querySelector(".popup_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

export { openModal, closeModal, clickOutsideModal};
