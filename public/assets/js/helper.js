"use strict";

function checkPasswordConfirm(formId) {
  let password = document.querySelector(`#${formId} [name=password]`);
  let confirmPassword = document.querySelector(
    `#${formId} [name=confirmPassword]`
  );
  if (password.value != confirmPassword.value) {
    confirmPassword.setCustomValidity("Passwords not match");
    confirmPassword.reportValidity();
  } else {
    confirmPassword.setCustomValidity("");
  }
}
