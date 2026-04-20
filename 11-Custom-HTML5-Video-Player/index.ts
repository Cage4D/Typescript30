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

function updateButton(e: Event) {
  const vid = e.currentTarget as HTMLVideoElement;
  const icon = vid.paused ? '►' : '❚ ❚';
  if (toggle) toggle.textContent = icon;
}

function skip(this: HTMLButtonElement) {
  if (!video) return;
  const skipValue = parseFloat(this.dataset.skip || "0");
  video.currentTime += skipValue;
}

video?.addEventListener("click", togglePlay);
video?.addEventListener("play", updateButton);
video?.addEventListener("pause", updateButton);
toggle?.addEventListener("click", togglePlay);
skipButtons?.forEach(buttons => buttons.addEventListener("click", skip))
