const player = document.getElementById("player-dialog");

player.addEventListener("click", (e) => {
  if (e.target.tagName === "DIALOG") {
    player.innerHTML = "";
    player.close();
  }
});

export function registerPlayer(videoContainer) {
  videoContainer.addEventListener("click", () => {
    const name = videoContainer.children[1].innerHTML;
    const link = videoContainer.firstChild.getAttribute("src");

    player.innerHTML = `
    <h4 class="video-name">${name}</h4>
    <video src="${link}" controls="controls"></video>`;

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
