import debounce from "debounce";

const scroller = document.querySelector(
  "section#section-production-page > div"
);
const scrollBtn = document.getElementById("scroll-to-top");

scroller.addEventListener(
  "scroll",
  debounce(() => {
    if (scroller.scrollTop > 320) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  }, 500)
);

scrollBtn.addEventListener("click", () => {
  scroller.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
