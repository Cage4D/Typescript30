window.addEventListener("keydown", playSound)

function removeTransition(event: TransitionEvent):void {
    if (event.propertyName !== "transform") return;
    const element = event.currentTarget as HTMLDivElement
    element.classList.remove("playing")
}

function playSound(event: KeyboardEvent): void {
    const audio:any = document.querySelector<HTMLAudioElement>(`audio[data-key="${event.keyCode}"]`);
    const key = document.querySelector<HTMLDivElement>(`div[data-key="${event.keyCode}"]`)
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    key?.classList.add("playing")
    const keys = document.querySelectorAll<HTMLDivElement>(".key") 
    keys.forEach(key => key.addEventListener("transitionend", removeTransition))
}