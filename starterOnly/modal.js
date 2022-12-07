const navMobile = document.querySelector(".icon");
const editNav = () => {
  navMobile.addEventListener("click", () => {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  });
};
editNav();

// DOM Elements

// close modal form
const closeModalBtn = document.querySelectorAll("#close");
const modalbg = document.querySelector(".bground");
const modalBody = document.querySelector(".modal-body");
const messageConfirm = document.querySelector(".messageConfirm");

const formData = document.querySelectorAll(".formData");
const modalContent = document.querySelector(".content");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalContentConfirm = document.querySelector(".contentConfirm");
const modalBtnSignup = document.getElementById("signup");
const form = document.getElementById("reserve");
const first = document.querySelector("#first");
const last = document.querySelector("#last");
const email = document.querySelector("#email");
const checkbox = document.querySelector("#checkbox1");
const birthday = document.getElementById("birthdate");
const numberTournament = document.getElementById("quantity");
const areaTournament = document.querySelectorAll(".checkbox-input");

// inputs
let firstName,
  lastName,
  emailAdress,
  birthdate,
  counterTournament,
  area,
  checkCGU;

const inputs = document.querySelectorAll(
  'input[type="text"]',
  'input[type="date"]',
  'input[type="checkbox"]',
  'input[type="number"]',
  'input[type="radio"]'
);
console.log(inputs);
// steps to check all inputs no to be empty
const isValid = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const isEmailValid = (email) => {
  const regPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regPattern.test(email);
};

const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const error = formField.querySelector("small");
  error.textContent = "";
};

const checkUsername = () => {
  let valid = false;
  const min = 2,
    max = 20;
  const firstname = first.value.trim();
  const lastname = last.value.trim();

  if (!isValid(firstname)) {
    showError(first, "Ce champ doit être rempli");
    firstName = null;
  } else if (!isBetween(firstname.length, min, max)) {
    showError(first, `Veuillez saisir entre ${min} et ${max} caractères.`);
    firstName = null;
  } else if (
    !firstname.match(/^(?=.{1,20}$)[A-zÀ-ÿ-Z]+(?:[-'\s][A-zÀ-ÿ-Z]+)*$/)
  ) {
    showError(first, "Le prénom ne doit pas contenir de caractères spéciaux");
    firstName = null;
  } else {
    showSuccess(first);
    firstName = firstname;
    valid = true;
  }

  if (!isValid(lastname)) {
    showError(last, "Ce champ doit être rempli");
    lastName = null;
  } else if (!isBetween(lastname.length, min, max)) {
    showError(last, `Veuillez saisir entre ${min} et ${max} caractères.`);
    lastName = null;
  } else if (
    !lastname.match(/^(?=.{1,20}$)[A-zÀ-ÿ-Z]+(?:[-'\s][A-zÀ-ÿ-Z]+)*$/)
  ) {
    showError(last, "Le nom ne doit pas contenir de caractères spéciaux");
    lastName = null;
  } else {
    showSuccess(last);
    lastName = lastname;
    valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const emailValue = email.value.trim();
  if (!isValid(emailValue)) {
    showError(email, "Ce champ doit être rempli");
    emailAdress = null;
  } else if (!isEmailValid(emailValue)) {
    showError(email, "L'adresse email n'est pas valide");
    emailAdress = null;
  } else {
    showSuccess(email);
    emailAdress = emailValue;
    valid = true;
  }
  return valid;
};
// check user birthday
// function to calculate age
const getAge = (birthDateUser) => {
  Math.floor((new Date() - new Date(birthDateUser).getTime()) / 3.15576e10);
};
const checkBirth = () => {
  const min = 10,
    max = 45;
  let valid = false;
  const birthDate = birthday.value;
  let age = getAge(birthDate);
  if (!isValid(birthDate)) {
    showError(birthday, "Ce champ doit être rempli");
    birthdate = null;
  } else if (!isBetween(age, min, max)) {
    showError(
      birthday,
      "Vous n'avez pas l'âge requis pour participer à un tournoi"
    );
    birthdate = null;
  } else {
    showSuccess(birthday, "");
    birthdate = birthDate;
    valid = true;
  }

  return valid;
};
// check number of tournament
const checkNumberTournament = () => {
  let valid = false;
  let regNumber = /^([1-9]$|^[1-9][0-9]$)|^(99)$/;
  if (!numberTournament.value.match(regNumber)) {
    showError(
      numberTournament,
      "Veuillez saisir un nombre compris entre 0 et 99"
    );
    counterTournament = null;
  } else {
    showSuccess(numberTournament, "");
    counterTournament = numberTournament.value;
    valid = true;
  }
  return valid;
};
// check area choice
const checkAreaTournament = () => {
  let valid = false;

  const selectedArea = document.getElementsByName("location");
  // check at least one area is chosen
  for (var i = 0; i < selectedArea.length; i++) {
    if (selectedArea[i].checked) {
      showSuccess(selectedArea[i], "");
      area = selectedArea[i].value;
      valid = true;
      break;
    } else {
      showError(selectedArea[i], "Veuillez cocher une ville");
      area = null;
    }
  }
  return valid;
};

// check for CGU
const checkCheckboxInput = () => {
  if (!checkbox.checked) {
    showError(checkbox, "Ce champ doit être coché");
    checkCGU = null;
    return false;
  } else {
    showSuccess(checkbox, "");
    checkCGU = "checked";
    return true;
  }
};
// display or hide error message on state change
checkbox.addEventListener("change", (event) => {
  if (event.currentTarget.checked) {
    showSuccess(checkbox, "");
  } else {
    showError(checkbox, "Ce champ doit être coché");
  }
});

// launch modal form

function launchModal() {
  modalbg.style.display = "block";
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  document.body.style.overflow = "initial";
}
// close Modal
closeModalBtn.forEach((btn) => btn.addEventListener("click", closeModal));

// check input in real time
inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "first":
        checkUsername(e.target.value);
        break;
      case "last":
        checkUsername(e.target.value);
        break;
      case "email":
        checkEmail(e.target.value);
        break;
      case "birthdate":
        checkBirth(e.target.value);
        break;
      case "quantity":
        checkNumberTournament(e.target.value);
        break;
      case "location":
        checkAreaTournament(e.target.value);
        break;
      case "checkbox1":
        checkCheckboxInput(e.target.value);
        break;
    }
  });
});

// Form validation
function validate() {
  checkUsername();
  checkEmail();
  checkBirth();
  checkNumberTournament();
  checkAreaTournament();
  checkCheckboxInput();
}
//clear inputs
function clearInputs() {
  inputs.forEach((input) => (input.value = ""));
}

// Form sent
function sendForm() {
  modalBody.classList.add("not-active");
  //change height of modal content
  let content = document.getElementById("content");
  content.style.height = "80%";
  //content.style.width = "350px";
  content.style.borderRadius = "8px 8px 0 0";
}

// Message form sent
function sendFormMessage() {
  messageConfirm.innerHTML +=
    "<p id='textconfirm'>Merci pour votre inscription</p>" +
    '<button id="btnconfirm" onclick="closeModalReload()">Fermer</button>';

  form.reset();
}

function closeModalReload() {
  modalbg.style.display = "none";
  document.body.style.overflow = "initial";
  window.location.reload();
}

// form submit
reserve.addEventListener("submit", (e) => {
  e.preventDefault();
  validate();

  if (
    firstName &&
    lastName &&
    emailAdress &&
    birthdate &&
    counterTournament &&
    area &&
    checkCGU
  ) {
    const data = {
      firstName,
      lastName,
      emailAdress,
      birthdate,
      counterTournament,
      area,
      checkCGU,
    };
    console.log(
      "res = " +
        data.firstName +
        " " +
        data.lastName +
        " " +
        data.emailAdress +
        " " +
        data.birthdate +
        " " +
        data.counterTournament +
        " " +
        data.area +
        " " +
        data.checkCGU
    );
    sendForm();
    sendFormMessage();
  }
});
