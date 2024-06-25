import "./pages/index.css";
import { createCard, likeCard } from "./scripts/card";
import { openModal, closeModal, closeModalWithClick, closeModalWithOverlayClick } from "./scripts/modal";
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest, logError } from "./scripts/api.js";
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
  patchRequest("users/me", { name: profileForm.name.value, about: profileForm.description.value })
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
  patchRequest("users/me/avatar", { avatar: avatarForm["avatar-link"].value })
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
const cardLikesCount = card.querySelector(".card__likes-count");
const cardLikeButton = card.querySelector(".card__like-button");

function addCardToDOM(cardData, userId) {
  const card = createCard(cardData, likeCard, zoomCard);
  if (userId == cardData.owner._id) {
    const cardDeleteButton = card.querySelector(".card__delete-button");
    cardDeleteButton.classList.remove("card__delete-button_disabled");
    cardDeleteButton.addEventListener("click", (evt) => {
      deleteRequest("cards", cardData._id)
        .then(() => card.remove())
        .catch(logError);
    });
  }
  cardLikesCount.textContent = cardData.likes.length;
  if (cardData.likes.some((user) => user._id === userId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }
  cardLikeButton.addEventListener("click", () => {
    if (cardLikeButton.classList.contains("card__like-button_is-active")) {
      deleteRequest("cards/likes", cardData._id)
        .then((cardData) => {
          cardLikeButton.classList.remove("card__like-button_is-active");
          cardLikesCount.textContent = cardData.likes.length;
        })
        .catch(logError);
    } else {
      putRequest("cards/likes", {}, cardData._id)
        .then((cardData) => {
          cardLikeButton.classList.add("card__like-button_is-active");
          cardLikesCount.textContent = cardData.likes.length;
        })
        .catch(logError);
    }
  });
  placesElement.append(card);
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
  const body = { name: addCardForm["place-name"].value, link: addCardForm["link"].value };
  postRequest("cards", body)
    .then((cardData) => {
      addCardToDOM(cardData, cardData.owner._id);
      addCardForm.reset();
      clearValidation(addCardForm, validationConfig);
      closeModal(cardAddModal);
    })
    .catch(logError);
});

// инициализация страницы

const popupElements = document.querySelectorAll(".popup");
const userPromise = getRequest("users/me");
const cardsPromise = getRequest("cards");

popupElements.forEach((element) => {
  element.querySelector("button.popup__close").addEventListener("click", closeModalWithClick);
  element.addEventListener("click", closeModalWithOverlayClick);
});

Promise.all([userPromise, cardsPromise])
  .then(([userData, cardsData]) => {
    updateProfileInDOM(userData);
    cardsData.forEach((cardData) => {
      addCardToDOM(cardData, userData._id);
    });
  })
  .catch(logError);

enableValidation(validationConfig);
