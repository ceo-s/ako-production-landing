import { validateForm } from "./validate_form";
import { sendForm } from "./send_form";

const form = document.querySelector("form.quote-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm(e).ok) {
    sendForm(e);
  }
});
