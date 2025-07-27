import { validateForm } from "./validate_form";
import { sendForm } from "./send_form";
import hintShowcases from "./hint-showcases";

hintShowcases();
const form = document.querySelector("form.quote-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validateForm(e).ok) {
    sendForm(e);
  }
});
