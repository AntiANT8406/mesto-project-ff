const cardTemplate = document.querySelector("#card-template").content;

const createCard = (name, link, deleteCard) => {
    const currentCard = cardTemplate.cloneNode(true);
    const cardImage = currentCard.querySelector('.card__image');
    cardImage.src = link;
    const cardTitle = currentCard.querySelector('.card__title');
    cardTitle.textContent = name;
    const deleteButton = currentCard.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    return currentCard;
}

const deleteCard = (evt) => {
    const eventTarget = evt.target;
    const currentCard = eventTarget.closest('.card');
    currentCard.remove();
}


const placesElement = document.querySelector('.places__list');
console.log('started');
for (const cardItems of initialCards) {
    const card = createCard(cardItems.name, cardItems.link);
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);
    placesElement.append(card);
}
