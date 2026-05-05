const player = document.querySelector<HTMLDivElement>(".player")!;
const video = player.querySelector<HTMLVideoElement>(".viewer")!;
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

function handleRangeUpdate(this:HTMLInputElement) {
  if (!video) return;
  (video as any)[this.name] = parseFloat(this.value);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  if(progressBar) progressBar.style.flexBasis = `${percent}%`
}

function scrub(e: MouseEvent) {
  const scrubTime = (e.offsetX / progressBar!.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

video?.addEventListener("click", togglePlay);
video?.addEventListener("play", updateButton);
video?.addEventListener("pause", updateButton);
video?.addEventListener("timeupdate", handleProgress);
toggle?.addEventListener("click", togglePlay);
skipButtons?.forEach(buttons => buttons.addEventListener("click", skip))
ranges?.forEach(range => range.addEventListener("change", handleRangeUpdate))
ranges?.forEach(range => range.addEventListener("mousemove", handleRangeUpdate))

let mouseDown = false;
progressBar?.addEventListener("click", scrub)
progressBar?.addEventListener("mousemove", (e) => mouseDown && scrub(e))
progressBar?.addEventListener("mousedown", () => mouseDown = true)
progressBar?.addEventListener("mouseup", () => mouseDown = false)
