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
const profileEditModalSaveButton = document.querySelector("#profile-edit-form");
const cardListEl = document.querySelector("#cards-list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

/* ----------------------- Functions ----------------------- */
function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true); /* cloning the template */
  const cardImageEl = cardElement.querySelector("#card-image");
  const cardTitleEl = cardElement.querySelector("#card-title");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.setAttribute("src", cardData.link);
  cardImageEl.setAttribute("alt", cardData.name);
  /* Add image alt text according to name of image */
  return cardElement;
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

profileCloseEditModalButton.addEventListener(
  "click",
  closePopup
); /* Making modal invisible */

profileEditModalSaveButton.addEventListener("submit", function (event) {
  profileName.textContent =
    profileNameInput.value; /* Making the input apply to name */
  profileDescription.textContent =
    profileDescriptionInput.value; /* Making the input apply to description */
  closePopup(); /* closing modal window when saved */
  event.preventDefault(); /* preventing page refresh */
});

initialCards.forEach((cardData) => {
  let cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
