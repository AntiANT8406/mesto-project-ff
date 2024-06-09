import './pages/index.css';
import {renderInitCards} from './scripts/cards.js';
import {createCard, deleteCard, likeCard, zoomCard} from "./scripts/card";
import {addCard, editProfile} from "./scripts/popup";

const cardTemplate = document.querySelector("#card-template").content;
const mainPage = document.querySelector('.content');
const profileElement = mainPage.querySelector('.profile');
const placesElement = mainPage.querySelector('.places__list');

renderInitCards(cardTemplate, placesElement, createCard, deleteCard, likeCard,zoomCard);

profileElement.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('profile__edit-button')) {
        editProfile(profileElement)
    } else if (target.classList.contains('profile__add-button')) {
        addCard(placesElement, cardTemplate)
    }
})