const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
console.log(initialCards);

/* ----------------------- Elements ----------------------- */
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseEditModalButton = document.querySelector(
  "#profile-close-edit-modal"
);
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditModalForm = document.querySelector("#profile-edit-form");
const cardListEl = document.querySelector("#cards-list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const profileAddCardModal = document.querySelector("#add-card-modal");
const profileAddCardButton = document.querySelector("#profile-add-card-button");
const profileAddCardForm = document.querySelector("#profile-add-card-form");
const profileCloseAddCardButton = document.querySelector(
  "#profile-close-add-modal"
);
const newCardTitleInput = document.querySelector("#profile-title-input");
const newCardImageLinkInput = document.querySelector(
  "#profile-image-link-input"
);
const previewImageModal = document.querySelector("#preview-image-modal");
const closePreviewModalButton = document.querySelector("#close-preview-modal");
const modalPreviewImage = document.querySelector("#preview-image-modal");
const modalImageCaption = document.querySelector("#modal-image-caption");
const enlargedImage = document.querySelector("#enlarged-image");
/* ----------------------- Functions ----------------------- */
function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true); /* cloning the template */
  const cardImageEl = cardElement.querySelector("#card-image");
  const cardTitleEl = cardElement.querySelector("#card-title");
  const cardLikeButton = cardElement.querySelector("#card-like-button");
  const cardDeleteButton = cardElement.querySelector("#card-delete-button");

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove(); /* Removes card element when delete button pressed */
  });
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("elements__like-button_activated");
  });
  cardTitleEl.textContent = cardData.name;
  cardImageEl.setAttribute("src", cardData.link);
  cardImageEl.setAttribute("alt", cardData.name);
  cardImageEl.addEventListener("click", () => {
    enlargedImage.setAttribute("src", cardData.link);
    enlargedImage.setAttribute("alt", cardData.name);
    modalImageCaption.textContent = cardData.name;
    previewImageModal.classList.add("modal_opened");
  });
  /* Add image alt text according to name of image */
  return cardElement;
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  closePopup(profileEditModal);
}

/* ----------------------- Event Listeners ----------------------- */
profileEditButton.addEventListener("click", function () {
  profileNameInput.value = profileName.textContent
    .replace(/[\n\r]+|[\s]{2,}/g, " ")
    .trim(); /* Pre-filling Name and removing excess whitespace */
  profileDescriptionInput.value =
    profileDescription.textContent; /* Pre-filling Description */
  profileEditModal.classList.add("modal_opened"); /* Making modal visible */
});

profileCloseEditModalButton.addEventListener("click", () => {
  closePopup(profileEditModal);
}); /* Making modal invisible */

profileEditModalForm.addEventListener("submit", function (event) {
  profileName.textContent =
    profileNameInput.value; /* Making the input apply to name */
  profileDescription.textContent =
    profileDescriptionInput.value; /* Making the input apply to description */
  closePopup(profileEditModal); /* closing modal window when saved */
  event.preventDefault(); /* preventing page refresh */
});

initialCards.forEach((cardData) => {
  let cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});

/* add an event listener to open up the new card-adding modal when clicking button*/
profileAddCardButton.addEventListener("click", function () {
  profileAddCardModal.classList.add("modal_opened");
});
/*use submit form to close instead of clicking create button */
profileAddCardForm.addEventListener("submit", function (event) {
  let newCardData = {
    name: "",
    link: "",
  };
  newCardData.name = newCardTitleInput.value;
  newCardData.link = newCardImageLinkInput.value;
  let cardElement = getCardElement(newCardData);
  cardListEl.prepend(cardElement);
  closePopup(profileAddCardModal);
  event.preventDefault();
});

profileCloseAddCardButton.addEventListener("click", () => {
  closePopup(profileAddCardModal);
});

closePreviewModalButton.addEventListener("click", () => {
  closePopup(previewImageModal);
});
