const cardTemplate = document.querySelector("#card-template").content;
const placesElement = document.querySelector('.places__list');

const deleteCard = (evt) => {
    const eventTarget = evt.target;
    const currentCard = eventTarget.closest('.card');
    currentCard.remove();
}

const createCard = (name, link, deleteFunction) => {
    const currentCard = cardTemplate.cloneNode(true);
    const cardImage = currentCard.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = 'Фотография ' + name;
    const cardTitle = currentCard.querySelector('.card__title');
    cardTitle.textContent = name;
    const cardDeleteButton = currentCard.querySelector('.card__delete-button');
    cardDeleteButton.addEventListener('click', deleteFunction);
    return currentCard;
}

const renderInitCards = (cards, deleteFunction) => {
    for (const cardItems of cards) {
        const card = createCard(cardItems.name, cardItems.link, deleteFunction);
        placesElement.append(card);
    }
}

renderInitCards(initialCards, deleteCard);
