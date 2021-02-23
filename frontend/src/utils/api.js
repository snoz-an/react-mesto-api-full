export class Api {
    constructor(options) {
      this._url = options.baseUrl;
    }
  
    _parseResult(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
  
  
    getInitialCards(token) {
      return fetch(`${this._url}/cards`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
  
    getUserProfile(token) {
      return fetch(`${this._url}/users/me`, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
  
    setUserProfile(data, token) {
      return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          about: data.about
        }),
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
    addNewCard(data, userId, token) {
      return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data, userId),
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
  
    newAvatar(data, token) {
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
        .then(res => {
          return this._parseResult(res)
        })
  
    }
  
    deleteCard(id, token) {
      return fetch(`${this._url}/cards/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
  
    likeCard(id, token) {
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
    dislikeCard(id, token) {
      return fetch(`${this._url}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then(res => {
          return this._parseResult(res)
        })
    }
  
  }
  
  
   const api = new Api({
    baseUrl: 'http://snozz.students.nomoreparties.space',
  }
  )
  
  export default api