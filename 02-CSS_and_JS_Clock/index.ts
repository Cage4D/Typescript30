const secondHand = document.querySelector<HTMLDivElement>(".second-hand")
const minuteHand = document.querySelector<HTMLDivElement>(".min-hand")
const hourHand = document.querySelector<HTMLDivElement>(".hour-hand")

function setDate():void {
    if (!secondHand || !minuteHand || !hourHand) return;

    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondDegrees = ((seconds / 60) * 360) + 90;
    const minuteDegrees = ((minutes / 60) * 360) + 90;
    const hourDegrees = ((hours / 12) * 360) + 90;

    secondHand.style.transform = `rotate(${secondDegrees}deg)`
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`
    hourHand.style.transform = `rotate(${hourDegrees}deg)`
}

setInterval(setDate, 1000)