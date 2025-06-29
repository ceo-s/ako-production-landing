const cards = document.querySelectorAll("#section-services .service-card");
let currentCard = cards[0];

for (let card of cards) {
  hideDescription(card);
  card.addEventListener("click", onCardClick);
}
showDescription(cards[0]);

function hideDescription(card) {
  card.classList.remove("opened");
  card.classList.add("closed");
}

function showDescription(card) {
  card.classList.remove("closed");
  card.classList.add("opened");
  currentCard = card;
}

function onCardClick(e) {
  let card = e.currentTarget;
  hideDescription(currentCard);
  showDescription(card);
}
