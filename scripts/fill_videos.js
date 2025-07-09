import { registerAutoplay, registerPlayer } from "./control_videos";

const grid = document.querySelector("div.grid");

let total = 0;
let loaded = 0;

let verticalVideosCount = 0;
let horizontalVideosCount = 0;

function insertPlaceholders() {}

function generateElement(id, name) {
  let el = document.createElement("div");
  el.classList.add("grid-item");
  el.classList.add("showcase");
  el.innerHTML = `<video src="https://media.ako-production.com/${id}" preload="metadata"></video><h4>${name}</h4>`;
  const video = el.children[0];

  video.addEventListener("loadedmetadata", function () {
    var ratio = video.videoWidth / video.videoHeight;

    if (ratio > 1) {
      video.parentElement.classList.add("horizontal");
      horizontalVideosCount++;
    } else {
      video.parentElement.classList.add("vertical");
      verticalVideosCount++;
    }
    loaded++;
    if (total == loaded) insertPlaceholders();
  });
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
  videos;

  for (const [id, name] of Object.entries(videos)) {
    let el = generateElement(id, name);
    registerAutoplay(el.children[0]);
    registerPlayer(el);
    grid.appendChild(el);
    total++;
  }
})();
