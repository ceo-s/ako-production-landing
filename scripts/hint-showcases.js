export default () => {
  const hintEl = document.getElementById("click-hint");
  let firstTime = !window.localStorage.getItem("showcase_hinted");

  const observer = new IntersectionObserver((e) => {
    console.log("isInt=" + e.at(0).isIntersecting + " ft=" + firstTime);
    if (e.at(0).isIntersecting && firstTime) {
      hintEl.style.opacity = 1;
      setTimeout(() => {
        hintEl.style.opacity = 0;
      }, 3000);
      window.localStorage.setItem("showcase_hinted", "yes");
      firstTime = false;
    }
  });

  observer.observe(hintEl);
};
