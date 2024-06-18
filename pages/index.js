import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditModalForm = document.querySelector("#profile-edit-form");
const cardListEl = document.querySelector("#cards-list");

const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector("#profile-add-card-button");
const addCardForm = document.querySelector("#profile-add-card-form");
const newCardTitleInput = document.querySelector("#profile-title-input");
const newCardImageLinkInput = document.querySelector(
  "#profile-image-link-input"
);
const previewImageModal = document.querySelector("#preview-image-modal");
const modalImageCaption = document.querySelector("#modal-image-caption");
const enlargedImage = document.querySelector("#enlarged-image");
const popups = document.querySelectorAll(".modal");

/* ----------------------- Validation ----------------------- */
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__form-input-error",
  errorClass: "modal__form-error",
};

// Already made variables for the forms: profileEditModalForm and addCardForm
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditModalForm
);
const addFormValidator = new FormValidator(validationSettings, addCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* ----------------------- Functions ----------------------- */
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEscape);
}

function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEscape);
}

function handleImageClick(name, link) {
  enlargedImage.setAttribute("src", link);
  enlargedImage.setAttribute("alt", name);
  modalImageCaption.textContent = name;
  openPopup(previewImageModal);
}

function closeModalEscape(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closePopup(openModal);
  }
}

/* ----------------------- Event Listeners ----------------------- */
profileEditButton.addEventListener("click", function () {
  profileNameInput.value = profileName.textContent
    .replace(/[\n\r]+|[\s]{2,}/g, " ")
    .trim(); /* Pre-filling Name and removing excess whitespace */
  profileDescriptionInput.value =
    profileDescription.textContent; /* Pre-filling Description */
  openPopup(profileEditModal); /* Making modal visible */
});

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

/* add an event listener to open up the new card-adding modal when clicking button*/
addCardButton.addEventListener("click", function () {
  openPopup(addCardModal);
});
/*use submit form to close instead of clicking create button */

/* ----------------------- Card Generation ----------------------- */
function createCard(cardData) {
  const newCard = new Card(cardData, "#card-template", handleImageClick);
  return newCard.getView();
}

function renderCard(cardData) {
  const newCardElement = createCard(cardData);
  cardListEl.prepend(newCardElement);
}

initialCards.forEach((cardData) => {
  renderCard(cardData);
});

addCardForm.addEventListener("submit", function (event) {
  const newCardData = {
    name: "",
    link: "",
  };
  newCardData.name = newCardTitleInput.value;
  newCardData.link = newCardImageLinkInput.value;
  renderCard(newCardData);
  closePopup(addCardModal);
  event.target.reset();
  addFormValidator.disableButton();
  event.preventDefault();
});
