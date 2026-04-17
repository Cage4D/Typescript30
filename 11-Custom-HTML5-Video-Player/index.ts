const player = document.querySelector<HTMLVideoElement>(".player");
const video = player?.querySelector<HTMLVideoElement>(".viewer");
const progress = player?.querySelector<HTMLDivElement>(".progress");
const progressBar = player?.querySelector<HTMLDivElement>(".progress__filled");
const toggle = player?.querySelector<HTMLButtonElement>(".toggle");
const skipButtons = player?.querySelectorAll<HTMLButtonElement>("[data-skip]");
const ranges = player?.querySelectorAll<HTMLInputElement>(".player__slider");

function togglePlay() {
  if (!video) return;

  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

video?.addEventListener("click", togglePlay);
toggle?.addEventListener("click", togglePlay);
