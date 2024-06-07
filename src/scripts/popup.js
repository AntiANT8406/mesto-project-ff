export function openPopup(modal) {
    modal.classList.add('popup_is-opened');
    modal.addEventListener('click', closePopupWithClick)
    document.addEventListener('keydown', closePopupWithEscape)
}

function closePopupWithClick(event) {
    const target = event.target;
    const popup = event.currentTarget;
    if (target.classList.contains('popup__close') || target === popup) {
        popup.classList.remove('popup_is-opened');
        popup.removeEventListener('click', closePopupWithClick);
        document.removeEventListener('keydown', closePopupWithEscape);
    }
}

function closePopupWithEscape(event) {
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened')
        popup.classList.remove('popup_is-opened');
        popup.removeEventListener('click', closePopupWithClick);
        document.removeEventListener('keydown', closePopupWithEscape);
    }
}

export function fillProfilePopup(name, description) {
    const form = document.forms['edit-profile'];
    form.name.value = name;
    form.description.value = description;
}