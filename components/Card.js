const enlargedImage = document.querySelector("#enlarged-image");
const modalImageCaption = document.querySelector("#modal-image-caption");

class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector("#card-like-button");
    const deleteButton = this._element.querySelector("#card-delete-button");
    const imageElement = this._element.querySelector("#card-image");

    likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    // For image handler:
    imageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }

  _handleLikeButton() {
    this._element
      .querySelector("#card-like-button")
      .classList.toggle("elements__like-button_activated");
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
    const cardImageEl = this._element.querySelector("#card-image");
    const cardTitleEl = this._element.querySelector("#card-title");
    cardTitleEl.textContent = this._name;
    cardImageEl.setAttribute("src", this._link);
    cardImageEl.setAttribute("alt", this._name);
  }

  getView() {
    this._element = this._getTemplate(); // clone node and get template
    this._setEventListeners(); // set event listeners
    this._populateCard(); // get card view

    return this._element; // return the card
  }
}

export default Card;
