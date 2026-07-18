const divs = document.querySelectorAll<HTMLDivElement>("div");
const button = document.querySelector<HTMLButtonElement>("button");

function logtext(this: HTMLDivElement, e: MouseEvent): void {
    console.log(this.classList.value);
}

divs.forEach(div => div.addEventListener("click", logtext, {
    capture: false,
    once: true
}));

button?.addEventListener("click", () => {
    console.log("Click!!!");
}, {
    once: true
});