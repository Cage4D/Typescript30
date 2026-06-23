const timeNodes = Array.from(
  document.querySelectorAll<HTMLElement>("[data-time]")
);

const seconds = timeNodes
  .map(node => node.dataset.time)
  .filter((timeCode): timeCode is string => !!timeCode)
  .map(timeCode => {
    const [mins, secs] = timeCode.split(":").map(Number);
    return mins * 60 + secs;
  })
  .reduce((total, vidSeconds) => total + vidSeconds, 0);

let secondsLeft = seconds;

const hours = Math.floor(secondsLeft / 3600);
secondsLeft %= 3600;

const mins = Math.floor(secondsLeft / 60);
secondsLeft %= 60;

console.log(hours, mins, secondsLeft);