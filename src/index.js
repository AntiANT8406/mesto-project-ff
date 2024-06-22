import "./pages/index.css";
import { createCard, likeCard } from "./scripts/card";
import { openModal, closeModal, closeModalWithClick, closeModalWithOverlayClick } from "./scripts/modal";
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from "./scripts/api.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

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

function addCardToDOM(cardData, userData) {
  const card = createCard(cardData, likeCard, zoomCard);
  if (userData == cardData.owner) {
    const cardDeleteButton = card.querySelector(".card__delete-button");
    cardDeleteButton.classList.remove("card__delete-button_disabled");
    cardDeleteButton.addEventListener("click", (evt) => {
      deleteRequest("cards", cardData._id)
        .then(() => card.remove())
        .catch((error) => console.log(`Ошибка: ${error}`));
    });
  }
  const cardLikeButton =card.querySelector(".card__like-button");
  console.log(cardData.likes)
  console.log(userData)
  console.log(Array.from(cardData.likes).includes(userData))
  if (cardData.likes.includes(userData)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }
  cardLikeButton.addEventListener("click", () => {
    if (cardLikeButton.classList.contains("card__like-button_is-active")) {
      deleteRequest("cards/likes", cardData._id)
        .then(() => cardLikeButton.classList.remove("card__like-button_is-active"))
        .catch((error) => console.log(`Ошибка: ${error}`));
    } else {
      putRequest("cards/likes", {}, cardData._id)
        .then(() => cardLikeButton.classList.add("card__like-button_is-active"))
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
  });
  placesElement.append(card);
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
  const body = { name: profileForm.name.value, about: profileForm.description.value };
  patchRequest("users/me", body)
    .then((profileData) => {
      updateProfileInDOM(profileData);
    })
    .catch((error) => console.log(`Ошибка: ${error}`));
  closeModal(profileModal);
});

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openModal(cardAddModal);
});

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const body = { name: addCardForm["place-name"].value, link: addCardForm["link"].value };
  postRequest("cards", body)
    .then((cardData) => {
      addCardToDOM(cardData, cardData.owner._id);
      addCardForm.reset();
      clearValidation(addCardForm, validationConfig);
      closeModal(cardAddModal);
    })
    .catch((error) => console.log(`Ошибка: ${error}`));
});

const userPromise = getRequest("users/me");
const cardsPromise = getRequest("cards");

Promise.all([userPromise, cardsPromise]).then(([userData, cardsData]) => {
  updateProfileInDOM(userData);
  cardsData.forEach((cardData) => {
    addCardToDOM(cardData, userData);
  });
});

enableValidation(validationConfig);
