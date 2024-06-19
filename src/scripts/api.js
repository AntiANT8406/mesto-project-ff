const config = {
    baseUrl: 'https://nomoreparties.co/v1/',
    cohort: 'wff-cohort-17/',
    token:'8fcda09a-8f72-4dc5-aa90-849dbf4c62a2'
}

export const makeAuthorizedRequest = (url) => {
    return fetch(config.baseUrl + config.cohort + url, {
        headers: {
            authorization: config.token,
        }
    })
    .then(response => response.json())
}