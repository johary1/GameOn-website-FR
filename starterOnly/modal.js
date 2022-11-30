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
let firstName, lastName, emailAdress;
console.log(first + "" + last + "" + email);
const inputs = document.querySelectorAll(
  'input[type="text"]',
  'input[type="checkbox"]'
);

const btnSubmit = document.getElementById("submitbtn");
console.log(btnSubmit);
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
  });
  btnConfirm.addEventListener("click", () => {
    modalbgConfirm.style.display = "none";
    document.body.style.overflow = "initial";
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
      case "checkbox":
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
  if (firstName && lastName && emailAdress) {
    const data = {
      firstName,
      lastName,
      emailAdress,
    };
    console.log(
      "res = " + data.emailAdress + " " + data.firstName + " " + data.lastName
    );
  }
  // validate forms
  let isUsernameValid = checkUsername(),
    isCGUchecked = checkCheckboxInput(),
    isEmailValid = checkEmail();

  let isFormValid = isUsernameValid && isEmailValid && isCGUchecked;
  // submit to the server if the form is valid
  if (isFormValid) {
    // launch modal register form
    launchModalConfirmRegistration();

    clearInputs();

    btnSubmit.disabled = true;
    alert("vous vous êtes déjà inscrit(e)");
    return true;
  }
});
