import './pages/index.css';
import {renderInitCards} from './scripts/cards.js';
import {createCard, deleteCard} from "./scripts/card";
import {openModal} from "./scripts/modal";

const cardTemplate = document.querySelector("#card-template").content;
const placesElement = document.querySelector('.places__list');
placesElement.addEventListener('click', function cardClickHandler(event) {
    const target = event.target;
    if (target.classList.contains('card__delete-button')) {
        deleteCard(target.closest('.card'));
    }
})

renderInitCards(cardTemplate, placesElement, createCard, deleteCard);

const modalProfile = document.querySelector('.popup_type_edit');
const mainPage = document.querySelector('.content');
mainPage.addEventListener('click', function profileClickHandler(event) {
    const target = event.target;
    if (target.classList.contains('profile__edit-button')) {
        openModal(modalProfile);
    }
})