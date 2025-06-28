const gsheetRecieverURL =
  "https://script.google.com/macros/s/AKfycbwtlJxFU27qfqXl6mii9C-xUcKQgLbOybsHwIQlrnnGupEN6dD0hMrS2b6nQ1-p6EcLsg/exec";
const form = document.querySelector("form.quote-form");

export function sendForm(submitEvent) {
  const data = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    description: form.description.value,
  };
  fetch(gsheetRecieverURL, {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => res.text())
    .then((msg) => alert("Отправлено!"))
    .catch((err) => alert("Ошибка"));
}
