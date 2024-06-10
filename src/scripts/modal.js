export function openModal(modalElement) {
  modalElement.classList.add("popup_is-opened");
}

export function closeModal(modalElement) {
  modalElement.classList.remove("popup_is-opened");
}

export function closeModalWithClick(evt) {
  closeModal(evt.target.closest(".popup"));
}

export function closeModalWithOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.target.closest(".popup"));
  }
}

export function closeModalWithEsc(evt) {
  const elementOpened = document.querySelector(".popup_is-opened");
  if (evt.key === "Escape" && elementOpened) {
    closeModal(elementOpened);
  }
}
