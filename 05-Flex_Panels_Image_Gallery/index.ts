const panels = document.querySelectorAll<HTMLDivElement>(".panel")

function toggleOpen(this: HTMLDivElement) {
    this.classList.toggle("open")
}

function toggleActive(this: HTMLDivElement, e: TransitionEvent) {
    if (e.propertyName.includes("flex")) {
        this.classList.toggle("open-active")
    }
}

panels.forEach(panel => panel.addEventListener("click", toggleOpen))
panels.forEach(panel => panel.addEventListener("transitionend", toggleActive))