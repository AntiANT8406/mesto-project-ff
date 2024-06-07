export function openModal(modal) {
    modal.classList.add('popup_is-opened');
    modal.addEventListener('click', closeModalWithClick)
}

function closeModalWithClick(event) {
    const target = event.target;
    const modal = event.currentTarget;
    if (target.classList.contains('popup__close') || target === modal) {
        modal.classList.remove('popup_is-opened');
        modal.removeEventListener('click', closeModalWithClick);
    }
}

