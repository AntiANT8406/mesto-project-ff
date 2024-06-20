import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard } from "./scripts/card";
import { openModal, closeModal, closeModalWithClick, closeModalWithOverlayClick } from "./scripts/modal";
import { makeAuthorizedRequest } from "./scripts/api.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardTemplate = document.querySelector("#card-template").content;
const profileElement = document.querySelector(".profile");
const placesElement = document.querySelector(".places__list");
const profileModal = document.querySelector(".popup_type_edit");
const cardAddModal = document.querySelector(".popup_type_new-card");
const cardZoomModal = document.querySelector(".popup_type_image");
const profileEditButton = profileElement.querySelector(".profile__edit-button");
const profileTitle = profileElement.querySelector(".profile__title");
const profileDescription = profileElement.querySelector(".profile__description");
const profileImage = profileElement.querySelector(".profile__image");
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

function updateProfileInDOM({ name, about, avatar }) {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  profileImage.src = avatar;
}

popupElements.forEach((element) => {
  element.querySelector("button.popup__close").addEventListener("click", closeModalWithClick);
  element.addEventListener("click", closeModalWithOverlayClick);
});

profileEditButton.addEventListener("click", () => {
  profileForm.name.value = profileTitle.textContent;
  profileForm.description.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openModal(profileModal);
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileTitle.textContent = profileForm.name.value;
  profileDescription.textContent = profileForm.description.value;
  closeModal(profileModal);
});

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
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

makeAuthorizedRequest("users/me").then((data) => {
  updateProfileInDOM(data);
  console.log(data);
});

makeAuthorizedRequest("cards").then((cardsData) => {
  cardsData.forEach((cardData) => {
    const card = createCard(cardData, cardTemplate, deleteCard, likeCard, zoomCard);
    placesElement.append(card);
  });
});

enableValidation(validationConfig);
