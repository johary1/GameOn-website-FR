function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
//2 modals
const modalbg = document.querySelector(".bground");
const modalbgConfirm = document.querySelector(".bgroundConfirm");

const formData = document.querySelectorAll(".formData");
const modalContent = document.querySelector(".content");
const modalContentConfirm = document.querySelector(".contentConfirm");
const modalBtnSignup = document.getElementById("signup");
const form = document.querySelector("form");
const first = document.querySelector("#first");
const last = document.querySelector("#last");
const email = document.querySelector("#email");
const checkbox = document.querySelector("#checkbox1");
const birthday = document.getElementById("birthdate");
const numberTournament = document.getElementById("quantity");
const areaTournament = document.querySelectorAll(".checkbox-input");
let form_being_submitted = false;

// inputs
let firstName, lastName, emailAdress, birthdate, counterTournament, area;
console.log(first + "" + last + "" + email);
const inputs = document.querySelectorAll(
  'input[type="text"]',
  'input[type="checkbox"]',
  'input[type="number"]',
  'input[type="radio"]',
  'input[type="date"]'
);

const btnSubmit = document.getElementById("submitbtn");

// steps to check all inputs to be valid
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
const getAge = (birthDateUser) =>
  Math.floor((new Date() - new Date(birthDateUser).getTime()) / 3.15576e10);
const checkBirth = () => {
  let valid = false;
  const birthDate = birthday.value;
  let age = getAge(birthDate);
  if (birthDate.length < 1) {
    showError(birthday, "Ce champ doit être rempli");
    birthdate = null;
  } else if (age < 12) {
    showError(
      birthday,
      "Vous n'avez pas l'âge requis pour participer à un tournoi"
    );
    birthdate = null;
  } else {
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
    showError(numberTournament, "");
    counterTournament = numberTournament.value;
    valid = true;
  }
  return valid;
};
// check area choice
const checkAreaTournament = () => {
  let valid = false;
  let selectedArea = document.getElementsByName("location");
  // check at least one area is chosen
  for (var i = 0; i < selectedArea.length; i++) {
    if (!selectedArea[i].checked) {
      showError(selectedArea[i], "Veuillez cocher une ville");
      area = null;
    } else {
      showError(selectedArea[i], "");
      area = selectedArea[i].value;
      valid = true;
    }
  }
  return valid;
};

// check for CGU
const checkCheckboxInput = () => {
  let valid = false;

  if (checkbox.checked === false) {
    showError(checkbox, "Ce champ doit être coché");
  } else {
    showError(checkbox, "");
    valid = true;
  }

  return valid;
};

// close modal form
const close = document.getElementById("close");

close.addEventListener("click", () => {
  modalbg.style.display = "none";
  document.body.style.overflow = "initial";
});

// launch modal form
let showFirstModal = false;
const launchModal = () => {
  modalbg.style.display = "block";
  document.body.style.overflow = "hidden";
  showFirstModal = true;
};

// launch modal event
modalBtnSignup.addEventListener("click", launchModal);

// launch modal confirmation registration
const launchModalConfirmRegistration = () => {
  modalbgConfirm.style.display = "block";
  if (showFirstModal) {
    modalbg.style.display = "none";
  }
  modalContentConfirm.innerHTML += `<span class="closeRegister" id="close-register"></span>
  <div class="endingTxt">Merci pour votre inscription</div>
  <input
  class="btn-register"
  id="close-confirm"
  value="Fermer"
  type="submit"

/>`;
  const closeRegister = document.getElementById("close-register");
  const btnConfirm = document.getElementById("close-confirm");
  // close modal register form
  closeRegister.addEventListener("click", () => {
    modalbgConfirm.style.display = "none";
    document.body.style.overflow = "initial";
    clearInputs();
  });
  btnConfirm.addEventListener("click", () => {
    modalbgConfirm.style.display = "none";
    document.body.style.overflow = "initial";
    clearInputs();
  });
};

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
      case "number":
        checkNumberTournament(e.target.value);
        break;
      case "birthdate":
        checkBirth(e.target.value);
        break;
      case "quantity":
        checkAreaTournament(e.target.value);
        break;
      case "location":
        checkCheckboxInput(e.target.value);
        break;
    }
  });
});
//clear inputs
function clearInputs() {
  inputs.forEach((input) => (input.value = ""));
}
// form submit
btnSubmit.addEventListener("click", (e) => {
  //prevent from form submission
  e.preventDefault();
  // all conditions must be true
  // validate forms
  let isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    hasBirthday = checkBirth(),
    isNumberTournamentValid = checkNumberTournament(),
    isAreaTournamentValid = checkAreaTournament(),
    isCGUchecked = checkCheckboxInput();

  let isFormValid =
    isUsernameValid &&
    isEmailValid &&
    hasBirthday &&
    isNumberTournamentValid &&
    isAreaTournamentValid &&
    isCGUchecked;
  if (
    firstName &&
    lastName &&
    emailAdress &&
    hasBirthday &&
    counterTournament &&
    area
  ) {
    const data = {
      firstName,
      lastName,
      emailAdress,
      birthdate,
      counterTournament,
      area,
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
        data.area
    );
  }

  // submit to the server if the form is valid
  if (isFormValid) {
    form_being_submitted = true;
    // launch modal register form
    launchModalConfirmRegistration();
    clearInputs();
    /*if (form_being_submitted) {
      btnSubmit.disabled = true;
      //alert("vous vous êtes déjà inscrit(e)");
    }*/
    //return true;
  }
});
