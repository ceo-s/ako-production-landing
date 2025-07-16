import { registerAutoplay, registerPlayer } from "./control_videos";

const grid = document.querySelector("div.grid");

let total = 0;
let loaded = 0;

let verticalVideosCount = 0;
let horizontalVideosCount = 0;

function insertPlaceholders() {}

function generateElement(videoId, previewId, thumbnailId, name) {
  let el = document.createElement("div");
  el.classList.add("grid-item");
  el.classList.add("showcase");

  const baseUrl = "https://media.ako-production.com";
  el.innerHTML = `<img src="${baseUrl}/${thumbnailId}">
  <video data-full-video="${baseUrl}/${videoId}" src="${baseUrl}/${previewId}" preload="none" muted loop></video>
  <h4>${name}</h4>`;
  const thumbnail = el.children[0];

  thumbnail.addEventListener("load", function () {
    var ratio = thumbnail.videoWidth / thumbnail.videoHeight;

    if (ratio > 1) {
      thumbnail.parentElement.classList.add("horizontal");
      horizontalVideosCount++;
    } else {
      thumbnail.parentElement.classList.add("vertical");
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

  for (const data of Object.values(videos)) {
    let el = generateElement(
      data.videoId,
      data.previewId,
      data.thumbnailId,
      data.name
    );
    registerAutoplay(el);
    registerPlayer(el);
    grid.appendChild(el);
    total++;
  }
})();
