const cards = document.querySelectorAll("#section-services .service-card");
let currentCard = cards[0];

for (let card of cards) {
  hideDescription(card);
  card.addEventListener("click", onCardClick);
}
showDescription(cards[0]);

function hideDescription(card) {
  // card.querySelector("h6.description").style.visibility = "hidden";
  // card.querySelector("h6.description").style.display = "none";
  // card.querySelector("h6.description").style.opacity = "0";
  card.classList.remove("opened");
  card.classList.add("closed");
}

function showDescription(card) {
  // card.querySelector("h6.description").style.visibility = "visible";
  // card.querySelector("h6.description").style.display = "block";
  card.classList.remove("closed");
  card.classList.add("opened");
  // card.querySelector("h6.description");
  currentCard = card;
}

function onCardClick(e) {
  let card = e.currentTarget;
  hideDescription(currentCard);
  showDescription(card);
  console.log("Bals");
}
