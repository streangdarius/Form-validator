const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#passwordConfirm");

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.classList.add("error");
  const small = formControl.querySelector("small");
  small.innerText = message;
}
// Show input success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.classList.add("success");
}
// Check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `${getFieldName(input)} is not valid`);
  }
}
// Check required fields
function checkRequired(inputArray) {
  inputArray.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is requiered`);
    } else {
      showSuccess(input);
    }
  });
}
// Check input length
function checkLenght(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} cannot be longer than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}
// Check password match
function checkPasswordsMath(password, confirm) {
  if (password.value !== confirm.value) {
    showError(confirm, "Passwords do not match");
  }
}
// Get fieldname
function getFieldName(input) {
  if (input.id === "passwordConfirm") {
    input.id = "Confirmation of password";
  }
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkRequired([username, email, password, passwordConfirm]);
  checkLenght(username, 3, 15);
  checkEmail(email);
  checkLenght(password, 6, 25);
  checkPasswordsMath(password, passwordConfirm);
});
