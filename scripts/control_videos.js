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
