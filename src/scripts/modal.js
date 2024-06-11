export function openModal(modalElement) {
  modalElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeModalWithEsc);
}

export function closeModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeModalWithEsc);
}

export function closeModalWithClick(evt) {
  closeModal(evt.target.closest(".popup"));
}

export function closeModalWithOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target);
  }
}

export function closeModalWithEsc(evt) {
  if (evt.key === "Escape") {
    const elementOpened = document.querySelector(".popup_is-opened");
    closeModal(elementOpened);
  }
}
