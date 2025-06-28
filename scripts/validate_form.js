import parsePhoneNumber from "libphonenumber-js";

const inputPhone = document.querySelector("input#phone");

// Formatting phone while writing input
inputPhone.addEventListener("input", (e) => {
  let number = parsePhoneNumber(e.target.value);
  if (number) {
    e.target.value = number.formatInternational();
  }
});

export function validateForm(submitEvent) {
  let number = parsePhoneNumber(inputPhone.value);
  console.log("Validating");

  if (number === undefined || !number.isValid()) {
    inputPhone.setCustomValidity("Invalid phone number.");
    inputPhone.reportValidity();
    return { ok: false };
  }

  return { ok: true };
}
