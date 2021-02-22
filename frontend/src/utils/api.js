export class Api {
    constructor(options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
    }
  
    _parseResult(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
  
  
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
        headers: this._headers
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
  
    getUserProfile() {
      return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: this._headers,
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
  
    setUserProfile(data) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        }),
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
    addNewCard(data, userId) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(data, userId),
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
  
    newAvatar(data) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(data)
      })
        .then(res => {
          return this._parseResult(res)
        })
  
    }
  
    deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
  
    likeCard(id) {
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: 'PUT',
        headers: this._headers,
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
    dislikeCard(id) {
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
  }
  
  
   const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
    headers: {
      authorization: '5aa200a5-627f-47bb-8621-5fa3329764a9',
      "Content-Type": "application/json",
    },
  }
  )
  
  export default api