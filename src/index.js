import "./pages/index.css";
import { createCardElement } from "./scripts/card";
import { openModal, closeModal, closeModalWithClick, closeModalWithOverlayClick } from "./scripts/modal";
import { logError, getCards, getUserInfo, createCard, updateAvatar } from "./scripts/api.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//секция работы с профилем

const profileElement = document.querySelector(".profile");
const profileModal = document.querySelector(".popup_type_edit");
const profileEditButton = profileElement.querySelector(".profile__edit-button");
const profileTitle = profileElement.querySelector(".profile__title");
const profileDescription = profileElement.querySelector(".profile__description");
const profileForm = document.forms["edit-profile"];
const addCardButton = profileElement.querySelector(".profile__add-button");

function updateProfileInDOM({ name, about, avatar }) {
  profileTitle.textContent = name;
  profileDescription.textContent = about;
  profileImage.src = avatar;
}

profileForm.addEventListener("submit", (evt) => {
  updateUserInfo({ name: profileForm.name.value, about: profileForm.description.value })
    .then((profileData) => updateProfileInDOM(profileData))
    .catch(logError);
  closeModal(profileModal);
});

profileEditButton.addEventListener("click", () => {
  profileForm.name.value = profileTitle.textContent;
  profileForm.description.value = profileDescription.textContent;
  clearValidation(profileForm, validationConfig);
  openModal(profileModal);
});

// секция работы с аватаром

const avatarModal = document.querySelector(".popup_type_avatar");
const avatarForm = document.forms["avatar"];
const profileImage = profileElement.querySelector(".profile__image");
const profileImageContainer = profileElement.querySelector(".profile__image-container");

profileImageContainer.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarModal);
});

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  updateAvatar({ avatar: avatarForm["avatar-link"].value })
    .then((userData) => {
      updateProfileInDOM(userData);
      closeModal(avatarModal);
    })
    .catch(logError);
});

// секция работы с картами

const placesElement = document.querySelector(".places__list");
const cardAddModal = document.querySelector(".popup_type_new-card");
const cardZoomModal = document.querySelector(".popup_type_image");
const addCardForm = document.forms["new-place"];

function addCardToDOM(cardData, userData) {
  const card = createCardElement(cardData, userData, zoomCard);
  placesElement.prepend(card);
}

function zoomCard(name, link) {
  const imageElement = cardZoomModal.querySelector(".popup__image");
  imageElement.src = link;
  imageElement.alt = "Фотография " + name;
  cardZoomModal.querySelector(".popup__caption").textContent = name;
  openModal(cardZoomModal);
}

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openModal(cardAddModal);
});

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  createCard({ name: addCardForm["place-name"].value, link: addCardForm["link"].value })
    .then((cardData) => {
      addCardToDOM(cardData, cardData.owner);
      addCardForm.reset();
      clearValidation(addCardForm, validationConfig);
      closeModal(cardAddModal);
    })
    .catch(logError);
});

// инициализация страницы

const popupElements = document.querySelectorAll(".popup");
popupElements.forEach((element) => {
  element.querySelector("button.popup__close").addEventListener("click", closeModalWithClick);
  element.addEventListener("click", closeModalWithOverlayClick);
});

Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
    updateProfileInDOM(userData);
    cardsData.forEach((cardData) => {
      addCardToDOM(cardData, userData);
    });
  })
  .catch(logError);

enableValidation(validationConfig);
