class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        }).then(res => {
            return this._getResponseData(res);
        });
    }
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        }).then(res => {
            return this._getResponseData(res);
        });
    }
    editUserInfo(name, description) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: description
            })
        }).then(res => {
            return this._getResponseData(res);
        });
    }
    sendNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }).then(res => {
            return this._getResponseData(res);
        });
    }
    handleCardLike(cardId, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        }).then(res => {
            return this._getResponseData(res);
        });
    }
    changeAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        }).then(res => {
            return this._getResponseData(res);
        });
    }
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        }).then(res => {
            return this._getResponseData(res);
        });
    }
    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
}
export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
    headers: {
        authorization: '23076075-9776-470a-ae27-dcd7a176dfd6',
        'Content-Type': 'application/json'
    }
});
