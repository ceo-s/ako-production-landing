import debounce from "debounce";

const trigger = document.querySelector(
  "section#section-intro div.section-marker"
);
const scroller = document.querySelector("div.scroller");
const hideMe = document.querySelector("#social-networks-container");

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.right > 0
  );
}

scroller.addEventListener(
  "scroll",
  debounce(() => {
    if (isInViewport(trigger)) {
      hideMe.style.top = "-35px";
    } else {
      hideMe.style.top = "0px";
    }
  }, 250)
);
