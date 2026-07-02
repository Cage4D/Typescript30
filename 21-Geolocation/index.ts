const arrow = document.querySelector<HTMLOrSVGImageElement>(".arrow")
const speed = document.querySelector<HTMLSpanElement>(".speed-value")

navigator.geolocation.watchPosition((data) => {
    console.log(data)
    speed!.textContent = `${data.coords.speed}`;
    arrow!.style.transform = `rotate(${data.coords.heading}deg)`
}, (err) => {
    console.error(err)
})