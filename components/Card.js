class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector("#card-like-button");
    this._deleteButton = this._element.querySelector("#card-delete-button");
    this._imageElement = this._element.querySelector("#card-image");

    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    // For image handler:
    this._imageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleLikeButton() {
    this._likeButton.classList.toggle("elements__like-button_activated");
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
  }

  _populateCard() {
    const cardTitleEl = this._element.querySelector("#card-title");
    cardTitleEl.textContent = this._name;
    this._imageElement.setAttribute("src", this._link);
    this._imageElement.setAttribute("alt", this._name);
  }

  getView() {
    this._element = this._getTemplate(); // clone node and get template
    this._setEventListeners(); // set event listeners
    this._populateCard(); // get card view

    return this._element; // return the card
  }
}

export default Card;
