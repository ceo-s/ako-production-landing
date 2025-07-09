import debounce from "debounce";

const scroller = document.querySelector(
  "section#section-production-page > div"
);
const scrollBtn = document.getElementById("scroll-to-top");

window.addEventListener(
  "scroll",
  debounce(() => {
    console.log("Bals");
    console.log(window.scrollY);
    if (window.scrollY > 320) {
      console.log("Bals2");
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  }, 500)
);

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
