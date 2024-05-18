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
// console.log(initialCards);

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

const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector("#profile-add-card-button");
const addCardForm = document.querySelector("#profile-add-card-form");
const closeAddCardButton = document.querySelector("#profile-close-add-modal");
const newCardTitleInput = document.querySelector("#profile-title-input");
const newCardImageLinkInput = document.querySelector(
  "#profile-image-link-input"
);
const previewImageModal = document.querySelector("#preview-image-modal");
const closePreviewModalButton = document.querySelector("#close-preview-modal");
const modalPreviewImage = document.querySelector("#preview-image-modal");
const modalImageCaption = document.querySelector("#modal-image-caption");
const enlargedImage = document.querySelector("#enlarged-image");

const popups = document.querySelectorAll(".modal");
/* ----------------------- Functions ----------------------- */
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEscape);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEscape);
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
    openPopup(previewImageModal);
  });
  /* Add image alt text according to name of image */
  return cardElement;
}

function closeModalEscape(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closePopup(openModal);
  }
}

//function closeModalOverlayClick(event) {
//  if (event.target.classList.contains("modal_opened")) {
//    closePopup(event.target);
//  }
// }

/* ----------------------- Event Listeners ----------------------- */
profileEditButton.addEventListener("click", function () {
  profileNameInput.value = profileName.textContent
    .replace(/[\n\r]+|[\s]{2,}/g, " ")
    .trim(); /* Pre-filling Name and removing excess whitespace */
  profileDescriptionInput.value =
    profileDescription.textContent; /* Pre-filling Description */
  openPopup(profileEditModal); /* Making modal visible */
});

/* profileCloseEditModalButton.addEventListener("click", () => {
  closePopup(profileEditModal);
}); /* Making modal invisible */

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("modal__close")) {
      closePopup(popup);
    }
  });
});

profileEditModalForm.addEventListener("submit", function (event) {
  profileName.textContent =
    profileNameInput.value; /* Making the input apply to name */
  profileDescription.textContent =
    profileDescriptionInput.value; /* Making the input apply to description */
  closePopup(profileEditModal); /* closing modal window when saved */
  event.preventDefault(); /* preventing page refresh */
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});

/* add an event listener to open up the new card-adding modal when clicking button*/
addCardButton.addEventListener("click", function () {
  openPopup(addCardModal);
});
/*use submit form to close instead of clicking create button */
addCardForm.addEventListener("submit", function (event) {
  const newCardData = {
    name: "",
    link: "",
  };
  newCardData.name = newCardTitleInput.value;
  newCardData.link = newCardImageLinkInput.value;
  const cardElement = getCardElement(newCardData);
  cardListEl.prepend(cardElement);
  closePopup(addCardModal);
  event.target.reset();
  event.preventDefault();
});
