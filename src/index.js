import './pages/index.css';
import {renderInitCards} from './scripts/cards.js';
import {createCard, deleteCard} from "./scripts/card";

const cardTemplate = document.querySelector("#card-template").content;
const placesElement = document.querySelector('.places__list');

renderInitCards(cardTemplate, placesElement, createCard, deleteCard);
