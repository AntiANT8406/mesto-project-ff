import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from "./scripts/card";
import {
  openModal,
  closeModal,
  closeModalWithClick,
  closeModalWithEsc,
  closeModalWithOverlayClick,
} from "./scripts/modal";

const cardTemplate = document.querySelector("#card-template").content;
const profileElement = document.querySelector(".profile");
const placesElement = document.querySelector(".places__list");
const profileModal = document.querySelector(".popup_type_edit");
const cardAddModal = document.querySelector(".popup_type_new-card");
const cardZoomModal = document.querySelector(".popup_type_image");
const profileEditButton = profileElement.querySelector(".profile__edit-button");
const profileTitle = profileElement.querySelector(".profile__title");
const profileDescription = profileElement.querySelector(
  ".profile__description"
);
const profileForm = document.forms["edit-profile"];
const popupElements = document.querySelectorAll(".popup");
const addCardButton = profileElement.querySelector(".profile__add-button");
const addCardForm = document.forms["new-place"];

function zoomCard(name, link) {
  const imageElement = cardZoomModal.querySelector(".popup__image");
  imageElement.src = link;
  imageElement.alt = "Фотография " + name;
  cardZoomModal.querySelector(".popup__caption").textContent = name;
  openModal(cardZoomModal);
}

for (let cardItems of initialCards) {
  const card = createCard(
    cardItems,
    cardTemplate,
    deleteCard,
    likeCard,
    zoomCard
  );
  placesElement.append(card);
}

for (let element of popupElements) {
  element
    .querySelector("button.popup__close")
    .addEventListener("click", closeModalWithClick);
  element.addEventListener("click", closeModalWithOverlayClick);
}
document.addEventListener("keydown", closeModalWithEsc);

profileEditButton.addEventListener("click", () => {
  profileForm.name.value = profileTitle.textContent;
  profileForm.description.value = profileDescription.textContent;
  openModal(profileModal);
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileForm.name.value;
  profileDescription.textContent = profileForm.description.value;
  closeModal(profileModal);
});

addCardButton.addEventListener("click", () => {
  openModal(cardAddModal);
});
addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const card = createCard(
    { name: addCardForm["place-name"].value, link: addCardForm["link"].value },
    cardTemplate,
    deleteCard,
    likeCard,
    zoomCard
  );
  placesElement.prepend(card);
  addCardForm.reset();
  closeModal(cardAddModal);
});
