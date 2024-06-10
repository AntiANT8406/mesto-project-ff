import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, likeCard, zoomCard } from "./scripts/card";
import { openModal, addCard, editProfile } from "./scripts/modal";

const cardTemplate = document.querySelector("#card-template").content;
const profileElement = document.querySelector(".profile");
const placesElement = document.querySelector(".places__list");
const profileModal = document.querySelector(".popup_type_edit");
const cardAddModal = document.querySelector(".popup_type_new-card");
const cardZoomModal = document.querySelector(".popup_type_image");
const profileEditButton = profileElement.querySelector(".profile__edit-button");

for (let cardItems of initialCards) {
  const card = createCard(
    cardItems.name,
    cardItems.link,
    cardTemplate,
    deleteCard,
    likeCard,
    zoomCard
  );
  placesElement.append(card);
}

profileEditButton.addEventListener("click", (evt) => {
  openModal(profileModal);
});

profileElement.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("profile__edit-button")) {
    editProfile(profileElement);
  } else if (target.classList.contains("profile__add-button")) {
    addCard(placesElement, cardTemplate);
  }
});
