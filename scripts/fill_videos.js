import { registerAutoplay, registerPlayer } from "./control_videos";

const grid = document.querySelector("div.grid");

document.addEventListener("DOMContentLoaded", () => {
  var masonry = new Masonry(".grid", {
    itemSelector: ".grid-item",
    columnWidth: 400,
  });
});

function generateElement(id, name) {
  let el = document.createElement("div");
  el.classList.add("grid-item");
  el.classList.add("showcase");
  el.innerHTML = `<video src="https://media.ako-production.com/${id}" preload="metadata"></video><h4>${name}</h4>`;
  return el;
}

async function fetchVideos() {
  const resp = await fetch("https://ako-production.com/api/videos");
  if (!resp.ok) {
    console.error(await resp.text());
    return [];
  }
  return resp.json();
}

(async () => {
  const videos = await fetchVideos();

  for (const [id, name] of Object.entries(videos)) {
    let el = generateElement(id, name);
    registerAutoplay(el.children[0]);
    registerPlayer(el);
    grid.appendChild(el);
  }
})();
