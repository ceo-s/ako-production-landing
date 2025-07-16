const player = document.getElementById("player-dialog");
const video = player.querySelector("video");
const playButton = player.querySelector(".play-button");
const controls = player.querySelector(".controls");
const stopButton = player.querySelector(".stop-button");
const progress = player.querySelector(".progress");
const fullViewButton = player.querySelector(".full-view-button");
const closeButton = player.querySelector(".close-dialog");

const isMobile =
  window.matchMedia("(pointer: coarse)").matches ||
  /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) ||
  window.innerWidth <= 700;

let touchTimerMobile = null;

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
  progress.value = (video.currentTime / video.duration) * 100;
  video.play();
  playButton.style.display = "none";
  controls.style.display = "flex";
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
    console.log(
      "Setting attribute " + videoContainer.children[1].dataset.fullVideo
    );
    video.setAttribute("src", videoContainer.children[1].dataset.fullVideo);
    progress.value = 0;
    if (isMobile) {
      requestFullScreen();
    } else {
      pauseVideo();
      player.showModal();
    }
  });
}

export function registerAutoplay(videoContainer) {
  console.log("Registering autoplay!");
  console.log(videoContainer);
  console.log(videoContainer.children[1]);
  if (isMobile) {
    registerAutoplayMobile(videoContainer);
  } else {
    registerAutoplayDesktop(videoContainer);
  }
}

function registerAutoplayDesktop(videoContainer) {
  const video = videoContainer.children[1];

  videoContainer.onmouseover = () => {
    video.muted = true;
    video.play();
  };

  videoContainer.onmouseleave = () => {
    video.pause();
    video.currentTime = 0;
  };
}

function registerAutoplayMobile(videoContainer) {
  const video = videoContainer.children[1];

  videoContainer.addEventListener("touchstart", (e) => {
    touchTimerMobile = setTimeout(() => {
      startPreview();
      video.play();
    }, 500);
  });

  videoContainer.addEventListener("touchend", (e) => {
    clearTimeout(touchTimerMobile);
    video.pause();
  });

  videoContainer.addEventListener("touchmove", (e) => {
    clearTimeout(touchTimerMobile);
  });
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
  requestFullScreen();
});

function requestFullScreen() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    // Safari
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    // IE/Edge
    video.msRequestFullscreen();
  }
}
