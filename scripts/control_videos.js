const player = document.getElementById("player-dialog");
const video = player.querySelector("video");
const playButton = player.querySelector(".play-button");
const controls = player.querySelector(".controls");
const stopButton = player.querySelector(".stop-button");
const progress = player.querySelector(".progress");
const fullViewButton = player.querySelector(".full-view-button");
const closeButton = player.querySelector(".close-dialog");

player.addEventListener("click", (e) => {
  if (e.target.tagName === "DIALOG") {
    e.stopPropagation();
    pauseVideo();
    player.close();
  }
});

closeButton.addEventListener("click", (e) => {
  e.stopPropagation();
  pauseVideo();
  player.close();
});

function playVideo() {
  video.play();
  playButton.style.display = "none";
  controls.style.display = "flex";
  progress.value = 0;
  videoIsPlaying = true;
}

function pauseVideo() {
  video.pause();
  playButton.style.display = "inline-block";
  controls.style.display = "none";
  videoIsPlaying = false;
}

export function registerPlayer(videoContainer) {
  videoContainer.addEventListener("click", () => {
    video.setAttribute("src", videoContainer.firstChild.getAttribute("src"));
    progress.value = 0;
    pauseVideo();
    player.showModal();
  });
}

export function registerAutoplay(video) {
  video.onmouseover = () => {
    video.muted = true;
    video.play();
  };

  video.onmouseleave = () => {
    video.pause();
    video.currentTime = 0;
  };
}

let videoIsPlaying = false;

controls.style.display = "none";

video.addEventListener("click", () => {
  if (videoIsPlaying) {
    pauseVideo();
  } else {
    playVideo();
  }
});

playButton.addEventListener("click", (e) => {
  e.stopPropagation();
  playVideo();
});

stopButton.addEventListener("click", (e) => {
  e.stopPropagation();
  pauseVideo();
});

video.addEventListener("timeupdate", () => {
  const value = (video.currentTime / video.duration) * 100;
  progress.value = value;
  if (value === 100) {
    pauseVideo();
  }
});

progress.addEventListener("input", () => {
  const value = progress.value;
  video.currentTime = (value / 100) * video.duration;
});

fullViewButton.addEventListener("click", () => {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    // Safari
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    // IE/Edge
    video.msRequestFullscreen();
  }
});
