import {createCard, deleteCard, likeCard, zoomCard} from "./card";

export function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    addListenersToPopup(popupElement);
}

function closePopupWithClick(event) {
    const target = event.target;
    const popupElement = event.currentTarget;
    if (target.classList.contains('popup__close') || target === popupElement) {
        popupElement.classList.remove('popup_is-opened');
        removeListenersFromPopup(popupElement);
    }
}

function closePopupWithEscape(event) {
    if (event.key === 'Escape') {
        const popupElement = document.querySelector('.popup_is-opened')
        popupElement.classList.remove('popup_is-opened');
        removeListenersFromPopup(popupElement);
    }
}

function addListenersToPopup(popupElement) {
    popupElement.addEventListener('click', closePopupWithClick);
    document.addEventListener('keydown', closePopupWithEscape);
}

function removeListenersFromPopup(popupElement) {
    popupElement.removeEventListener('click', closePopupWithClick);
    document.removeEventListener('keydown', closePopupWithEscape);
}

export function editProfile(profileElement) {
    const popupProfileElement = document.querySelector('.popup_type_edit');
    const profileNameElement = profileElement.querySelector('.profile__title');
    const profileDescriptionElement = profileElement.querySelector('.profile__description');
    fillProfilePopup(profileNameElement, profileDescriptionElement);
    openPopup(popupProfileElement);
    popupProfileElement.addEventListener('submit', function submitProfile(event) {
        event.preventDefault();
        handleProfilePopupSubmit(profileNameElement, profileDescriptionElement);
        popupProfileElement.classList.remove('popup_is-opened');
        removeListenersFromPopup(popupProfileElement);
        popupProfileElement.removeEventListener('submit', submitProfile)
    });
}

export function addCard(placesElement, cardTemplate) {
    const popupNewCardElement = document.querySelector('.popup_type_new-card');
    openPopup(popupNewCardElement);
    popupNewCardElement.addEventListener('submit', function submitCard(event) {
        event.preventDefault();
        const formCreate = document.forms['new-place'];
        const card = createCard(
            formCreate['place-name'].value,
            formCreate['link'].value,
            cardTemplate,
            deleteCard,
            likeCard,
            zoomCard
        );
        placesElement.prepend(card);
        popupNewCardElement.classList.remove('popup_is-opened');
        formCreate.reset();
        removeListenersFromPopup(popupNewCardElement);
        popupNewCardElement.removeEventListener('submit', submitCard);
    })
}

function fillProfilePopup(nameElement, descriptionElement) {
    const form = document.forms['edit-profile'];
    form.name.value = nameElement.textContent;
    form.description.value = descriptionElement.textContent;
}

function handleProfilePopupSubmit(profileNameElement, profileDescriptionElement) {
    const form = document.forms['edit-profile'];
    profileNameElement.textContent = form.name.value;
    profileDescriptionElement.textContent = form.description.value;
}